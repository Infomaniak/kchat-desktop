// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import type {IpcMainEvent, IpcMainInvokeEvent} from 'electron';
import {BrowserView, dialog, ipcMain, session, shell} from 'electron';
import isDev from 'electron-is-dev';

import ServerViewState from 'app/serverViewState';
import AppState from 'common/appState';
import {
    UPDATE_TARGET_URL,
    LOAD_SUCCESS,
    LOAD_FAILED,
    LOADSCREEN_END,
    SET_ACTIVE_VIEW,
    OPEN_VIEW,
    BROWSER_HISTORY_PUSH,
    UPDATE_URL_VIEW_WIDTH,
    SERVERS_UPDATE,
    REACT_APP_INITIALIZED,
    APP_LOGGED_OUT,
    APP_LOGGED_IN,
    RELOAD_CURRENT_VIEW,
    UNREAD_RESULT,
    HISTORY,
    GET_VIEW_INFO_FOR_TEST,
    SESSION_EXPIRED,
    MAIN_WINDOW_CREATED,
    MAIN_WINDOW_RESIZED,
    MAIN_WINDOW_FOCUSED,
    SWITCH_TAB,
    GET_IS_DEV_MODE,
    REFRESH_TOKEN,
    RESET_AUTH,
    RESET_TEAMS,
    RESET_TOKEN,
    TOKEN_REFRESHED,
    TOKEN_REQUEST,
    CALL_JOINED,
    CALL_DECLINED,
    CALL_RINGING,
    CALL_JOINED_BROWSER,
    THEME_CHANGED,
    REQUEST_BROWSER_HISTORY_STATUS,
    LEGACY_OFF,
    UNREADS_AND_MENTIONS,
    CALL_API_AVAILABLE,
} from 'common/communication';
import Config from 'common/config';
import {Logger} from 'common/log';
import type {MattermostServer} from 'common/servers/MattermostServer';
import ServerManager from 'common/servers/serverManager';
import {SECOND, TAB_BAR_HEIGHT} from 'common/utils/constants';
import {getFormattedPathName, parseURL} from 'common/utils/url';
import Utils from 'common/utils/util';
import type {MattermostView} from 'common/views/View';
import {TAB_MESSAGING} from 'common/views/View';
import {flushCookiesStore} from 'main/app/utils';
import {localizeMessage} from 'main/i18nManager';
import TokenManager from 'main/tokenManager';
import callDialingWindow from 'main/windows/callDialingWindow';
import KmeetCallWindow from 'main/windows/kmeetCallWindow';
import MainWindow from 'main/windows/mainWindow';

import LoadingScreen from './loadingScreen';
import {MattermostBrowserView} from './MattermostBrowserView';
import modalManager from './modalManager';
import ServersSidebar from './serversSidebar';

import {getLocalURLString, getLocalPreload, getAdjustedWindowBoundaries, shouldHaveBackBar} from '../utils';

const log = new Logger('ViewManager');
const URL_VIEW_DURATION = 10 * SECOND;
const URL_VIEW_HEIGHT = 20;
export class ViewManager {
    private closedViews: Map<string, { srv: MattermostServer; view: MattermostView }>;
    private views: Map<string, MattermostBrowserView>;
    private currentView?: string;
    private callWindow?: BrowserWindow | null;

    private urlViewCancel?: () => void;

    constructor() {
        this.views = new Map(); // keep in mind that this doesn't need to hold server order, only views on the renderer need that.
        this.closedViews = new Map();

        MainWindow.on(MAIN_WINDOW_CREATED, this.init);
        MainWindow.on(MAIN_WINDOW_RESIZED, this.handleSetCurrentViewBounds);
        MainWindow.on(MAIN_WINDOW_FOCUSED, this.focusCurrentView);
        ipcMain.handle(GET_VIEW_INFO_FOR_TEST, this.handleGetViewInfoForTest);
        ipcMain.handle(GET_IS_DEV_MODE, () => isDev);
        ipcMain.handle(REQUEST_BROWSER_HISTORY_STATUS, this.handleRequestBrowserHistoryStatus);
        ipcMain.on(HISTORY, this.handleHistory);
        ipcMain.on(REACT_APP_INITIALIZED, this.handleReactAppInitialized);
        ipcMain.on(BROWSER_HISTORY_PUSH, this.handleBrowserHistoryPush);
        ipcMain.on(APP_LOGGED_IN, this.handleAppLoggedIn);
        ipcMain.on(APP_LOGGED_OUT, this.handleAppLoggedOut);
        ipcMain.on(RELOAD_CURRENT_VIEW, this.handleReloadCurrentView);
        ipcMain.on(UNREAD_RESULT, this.handleUnreadChanged);
        ipcMain.on(UNREADS_AND_MENTIONS, this.handleUnreadsAndMentionsChanged);
        ipcMain.on(SESSION_EXPIRED, this.handleSessionExpired);
        ipcMain.on(LEGACY_OFF, this.handleLegacyOff);

        ipcMain.on(SWITCH_TAB, (event, viewId) => this.showById(viewId));

        ipcMain.handle(TOKEN_REQUEST, this.handleTokenRequest);
        ipcMain.handle(REFRESH_TOKEN, async () => {
            const token = await TokenManager.handleRefreshToken();
            return token;
        });
        ipcMain.on(TOKEN_REFRESHED, this.handleTokenRefreshed);
        ipcMain.handle(RESET_TOKEN, this.handleResetToken);
        ipcMain.handle(RESET_AUTH, this.handleRevokeToken);

        // ipcMain.on(CALL_JOINED, this.handleCallJoined);
        ipcMain.on(CALL_JOINED_BROWSER, this.handleCallJoinedBrowser);

        // ipcMain.on(CALL_DECLINED, this.handleCallDeclined);
        ipcMain.on(CALL_API_AVAILABLE, this.handleCallApiAvailable);
        ipcMain.on(CALL_RINGING, this.handleCallDialing);
        ipcMain.handle(RESET_TEAMS, this.resetTeams);
        ipcMain.on(THEME_CHANGED, this.handleThemeChanged);

        ServerManager.on(SERVERS_UPDATE, this.handleReloadConfiguration);
    }

    private init = () => {
        TokenManager.load();
        LoadingScreen.show();
        ServerManager.getAllServers().forEach((server) => this.loadServer(server));
        this.showInitial();
    };

    getView = (viewId: string) => {
        return this.views.get(viewId);
    };

    getCurrentView = () => {
        if (this.currentView) {
            return this.views.get(this.currentView);
        }
        return undefined;
    };

    getViewByWebContentsId = (webContentsId: number) => {
        return [...this.views.values()].find((view) => view.webContentsId === webContentsId);
    };

    isViewClosed = (viewId: string) => {
        return this.closedViews.has(viewId);
    };

    showById = (viewId: string) => {
        this.getViewLogger(viewId).debug('showById', viewId);

        const newView = this.views.get(viewId);
        if (newView) {
            if (newView.isVisible) {
                return;
            }
            let hidePrevious;
            if (this.currentView && this.currentView !== viewId) {
                const previous = this.getCurrentView();
                if (previous) {
                    hidePrevious = () => previous.hide();
                }
            }

            this.currentView = viewId;
            if (!newView.isErrored()) {
                newView.show();
                if (newView.needsLoadingScreen()) {
                    LoadingScreen.show();

                    if (!TokenManager.hasToken()) {
                        ServersSidebar.hide();
                    }
                }
            }
            hidePrevious?.();
            MainWindow.get()?.webContents.send(SET_ACTIVE_VIEW, newView.view.server.id, newView.view.id);
            ServerViewState.updateCurrentView(newView.view.server.id, newView.view.id);
        } else {
            this.getViewLogger(viewId).warn(`Couldn't find a view with name: ${viewId}`);
        }
        modalManager.showModal();
    };

    focusCurrentView = () => {
        log.debug('focusCurrentView');

        if (modalManager.isModalDisplayed()) {
            modalManager.focusCurrentModal();
            return;
        }

        const view = this.getCurrentView();
        if (view) {
            view.focus();
        }
    };

    reload = () => {
        const currentView = this.getCurrentView();
        if (currentView) {
            LoadingScreen.show();
            currentView.reload();
        }
    };

    resetTeams = () => {
        ServerManager.reloadFromConfig();
    };

    handleThemeChanged = (_view: any, _viewId: any, data: object) => {
        Config.set('theme', data);
        viewManager.sendToAllViews(THEME_CHANGED, data);
    };

    handleCallJoined = (_: IpcMainEvent, message: any) => {
        //TODO: kMeet integration V2 => open call in a new window.
        //remove shell.openExternal and uncomment code below.
        // shell.openExternal(message.url);
        this.sendToAllViews(CALL_JOINED, message);
        this.destroyCallWindow();
        KmeetCallWindow.create(message);

        /*const withDevTools = true;
        this.callWindow = createCallWindow(this.mainWindow!, withDevTools);
        this.callWindow.loadURL(message.url);
        windowManager.sendToMattermostViews(CALL_JOINED, message);*/
    };

    handleCallJoinedBrowser = (_: IpcMainEvent, message: any) => {
        this.sendToAllViews(CALL_JOINED, message);
        this.destroyCallWindow();
    };

    handleCallDialing = (_: IpcMainEvent, message: any) => {
        callDialingWindow.create(message);
    };

    handleCallDeclined = (_: IpcMainEvent, message: unknown) => {
        this.sendToAllViews(CALL_DECLINED, message);
        this.destroyCallWindow();
    };

    handleCallApiAvailable = (_: IpcMainEvent, message: unknown) => {
        this.getCurrentView()?.sendToRenderer(CALL_API_AVAILABLE, message);
    };

    destroyCallWindow = () => {
        callDialingWindow.destroy();
    };

    handleTokenRefreshed = (event: IpcMainEvent, message: any) => {
        if (message.token) {
            TokenManager.handleStoreToken(event, message);
        }
    };

    handleResetToken = () => {
        TokenManager.reset();
    };

    handleTokenRequest = () => {
        const token = TokenManager.getToken();
        return token;
    };

    handleRevokeToken = async () => {
        const token = TokenManager.getToken();
        if (Object.keys(token).length) {
            await TokenManager.handleRevokeToken();
        }
        session.defaultSession.clearCache();
        session.defaultSession.clearStorageData();
    };

    sendToAllViews = (channel: string, ...args: unknown[]) => {
        this.views.forEach((view) => {
            if (!view.isDestroyed()) {
                view.sendToRenderer(channel, ...args);
            }
        });
    };

    sendToFind = () => {
        this.getCurrentView()?.openFind();
    };

    /**
     * Deep linking
     */

    handleDeepLink = (url: string | URL) => {
        if (url) {
            const parsedURL = parseURL(url)!;
            const view = ServerManager.lookupViewByURL(parsedURL, true);
            if (view) {
                const urlWithSchema = `${view.url.origin}${getFormattedPathName(parsedURL.pathname)}${parsedURL.search}`;
                if (this.closedViews.has(view.id)) {
                    this.openClosedView(view.id, urlWithSchema);
                } else {
                    const browserView = this.views.get(view.id);
                    if (!browserView) {
                        log.error(`Couldn't find a view matching the id ${view.id}`);
                        return;
                    }

                    if (browserView.isReady() && ServerManager.getRemoteInfo(browserView.view.server.id)?.serverVersion && Utils.isVersionGreaterThanOrEqualTo(ServerManager.getRemoteInfo(browserView.view.server.id)?.serverVersion ?? '', '6.0.0')) {
                        const formattedServerURL = `${browserView.view.server.url.origin}${getFormattedPathName(browserView.view.server.url.pathname)}`;
                        const pathName = `/${urlWithSchema.replace(formattedServerURL, '')}`;
                        browserView.sendToRenderer(BROWSER_HISTORY_PUSH, pathName);
                        this.deeplinkSuccess(browserView.id);
                    } else {
                        // attempting to change parsedURL protocol results in it not being modified.
                        browserView.resetLoadingStatus();
                        browserView.load(urlWithSchema);
                        browserView.once(LOAD_SUCCESS, this.deeplinkSuccess);
                        browserView.once(LOAD_FAILED, this.deeplinkFailed);
                    }
                }
            } else {
                dialog.showErrorBox(
                    localizeMessage('main.views.viewManager.handleDeepLink.error.title', 'No matching server'),
                    localizeMessage('main.views.viewManager.handleDeepLink.error.body', 'There is no configured server in the app that matches the requested url: {url}', {url: parsedURL.toString()}),
                );
            }
        }
    };

    private deeplinkSuccess = (viewId: string) => {
        this.getViewLogger(viewId).debug('deeplinkSuccess');

        this.showById(viewId);
        this.views.get(viewId)?.removeListener(LOAD_FAILED, this.deeplinkFailed);
    };

    private deeplinkFailed = (viewId: string, err: string, url: string) => {
        this.getViewLogger(viewId).error(`failed to load deeplink ${url}`, err);
        this.views.get(viewId)?.removeListener(LOAD_SUCCESS, this.deeplinkSuccess);
    };

    /**
     * View loading helpers
     */

    private loadServer = (server: MattermostServer) => {
        const views = ServerManager.getOrderedTabsForServer(server.id);
        views.forEach((view) => this.loadView(server, view));
    };

    private loadView = (srv: MattermostServer, view: MattermostView, url?: string) => {
        if (!view.isOpen) {
            this.closedViews.set(view.id, {srv, view});
            return;
        }
        const browserView = this.makeView(srv, view, url);
        this.addView(browserView);
    };

    private makeView = (srv: MattermostServer, view: MattermostView, url?: string): MattermostBrowserView => {
        const mainWindow = MainWindow.get();
        if (!mainWindow) {
            throw new Error('Cannot create view, no main window present');
        }

        const browserView = new MattermostBrowserView(view, {webPreferences: {spellcheck: Config.useSpellChecker}});
        browserView.once(LOAD_SUCCESS, this.activateView);
        browserView.on(LOADSCREEN_END, this.finishLoading);
        browserView.on(LOAD_FAILED, this.failLoading);
        browserView.on(UPDATE_TARGET_URL, this.showURLView);
        browserView.load(url);
        return browserView;
    };

    private addView = (view: MattermostBrowserView): void => {
        this.views.set(view.id, view);
        if (this.closedViews.has(view.id)) {
            this.closedViews.delete(view.id);
        }
    };

    private showInitial = () => {
        log.verbose('showInitial');

        // TODO: This init should be happening elsewhere, future refactor will fix this
        ServerViewState.init();
        if (ServerManager.hasServers()) {
            const lastActiveServer = ServerViewState.getCurrentServer();
            const lastActiveView = ServerManager.getLastActiveTabForServer(lastActiveServer.id);
            this.showById(lastActiveView.id);
        } else {
            MainWindow.get()?.webContents.send(SET_ACTIVE_VIEW);
        }
    };

    /**
     * Mattermost view event handlers
     */

    private activateView = (viewId: string) => {
        this.getViewLogger(viewId).debug('activateView');

        if (this.currentView === viewId) {
            this.showById(this.currentView);
        }
    };

    private finishLoading = (viewId: string) => {
        this.getViewLogger(viewId).debug('finishLoading');

        if (this.currentView === viewId) {
            this.showById(this.currentView);
            LoadingScreen.fade();
            ServersSidebar.show();
        }
    };

    private failLoading = (viewId: string) => {
        this.getViewLogger(viewId).debug('failLoading');

        LoadingScreen.fade();
        if (this.currentView === viewId) {
            this.getCurrentView()?.hide();
            ServersSidebar.hide();
        }
    };

    private showURLView = (url: URL | string) => {
        log.silly('showURLView', url);

        const mainWindow = MainWindow.get();
        if (!mainWindow) {
            return;
        }

        if (this.urlViewCancel) {
            this.urlViewCancel();
        }
        if (url && url !== '') {
            const urlString = typeof url === 'string' ? url : url.toString();
            const preload = getLocalPreload('internalAPI.js');
            const urlView = new BrowserView({
                webPreferences: {
                    preload,

                    // Workaround for this issue: https://github.com/electron/electron/issues/30993
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    transparent: true,
                }});
            const query = new Map([['url', urlString]]);
            const localURL = getLocalURLString('urlView.html', query);
            urlView.webContents.loadURL(localURL);
            MainWindow.get()?.addBrowserView(urlView);
            const boundaries = this.views.get(this.currentView || '')?.getBounds() ?? MainWindow.getBounds();

            const hideView = () => {
                delete this.urlViewCancel;
                try {
                    mainWindow.removeBrowserView(urlView);
                } catch (e) {
                    log.error('Failed to remove URL view', e);
                }

                urlView.webContents.close();
            };

            const adjustWidth = (event: IpcMainEvent, width: number) => {
                log.silly('showURLView.adjustWidth', width);

                if (!boundaries) {
                    return;
                }

                const bounds = {
                    x: 0,
                    y: (boundaries.height + TAB_BAR_HEIGHT) - URL_VIEW_HEIGHT,
                    width: width + 5, // add some padding to ensure that we don't cut off the border
                    height: URL_VIEW_HEIGHT,
                };

                log.silly('showURLView.setBounds', boundaries, bounds);
                urlView.setBounds(bounds);
            };

            ipcMain.on(UPDATE_URL_VIEW_WIDTH, adjustWidth);

            const timeout = setTimeout(hideView,
                URL_VIEW_DURATION);

            this.urlViewCancel = () => {
                clearTimeout(timeout);
                ipcMain.removeListener(UPDATE_URL_VIEW_WIDTH, adjustWidth);
                hideView();
            };
        }
    };

    /**
     * Event Handlers
     */

    /** Called when a new configuration is received
     * Servers or views have been added or edited. We need to
     * close, open, or reload views, taking care to reuse views and
     * preserve focus on the currently selected view. */
    private handleReloadConfiguration = () => {
        log.debug('handleReloadConfiguration');

        const currentViewId: string | undefined = this.views.get(this.currentView as string)?.view.id;

        const current: Map<string, MattermostBrowserView> = new Map();
        for (const view of this.views.values()) {
            current.set(view.view.id, view);
        }

        const views: Map<string, MattermostBrowserView> = new Map();
        const closed: Map<string, {srv: MattermostServer; view: MattermostView}> = new Map();

        const sortedViews = ServerManager.getAllServers().flatMap((x) => ServerManager.getOrderedTabsForServer(x.id).
            map((t): [MattermostServer, MattermostView] => [x, t]));

        for (const [srv, view] of sortedViews) {
            const recycle = current.get(view.id);
            if (!view.isOpen) {
                closed.set(view.id, {srv, view});
            } else if (recycle) {
                views.set(view.id, recycle);
            } else {
                views.set(view.id, this.makeView(srv, view));
            }
        }

        // commit the data to our local state
        // destroy everything that no longer exists
        for (const [k, v] of current) {
            if (!views.has(k)) {
                v.destroy();
            }
        }

        // commit views
        this.views = new Map();
        for (const x of views.values()) {
            this.views.set(x.id, x);
        }

        // commit closed
        for (const x of closed.values()) {
            this.closedViews.set(x.view.id, {srv: x.srv, view: x.view});
        }

        if ((currentViewId && closed.has(currentViewId)) || (this.currentView && this.closedViews.has(this.currentView))) {
            if (ServerManager.hasServers()) {
                this.currentView = undefined;
                this.showInitial();
            } else {
                MainWindow.get()?.webContents.send(SET_ACTIVE_VIEW);
            }
        }

        // show the focused view (or initial)
        if (currentViewId && views.has(currentViewId)) {
            const view = views.get(currentViewId);
            if (view && view.id !== this.currentView) {
                this.currentView = view.id;
                this.showById(view.id);
                MainWindow.get()?.webContents.send(SET_ACTIVE_VIEW, view.view.server.id, view.view.id);
            }

            // IK
            // else {
            //     this.focusCurrentView();
            // }
        } else {
            this.showInitial();
        }
    };

    private handleHistory = (event: IpcMainEvent, offset: number) => {
        this.getCurrentView()?.goToOffset(offset);
    };

    private handleAppLoggedIn = (event: IpcMainEvent) => {
        log.debug('handleAppLoggedIn', event.sender.id);
        const view = this.getViewByWebContentsId(event.sender.id);
        if (!view) {
            return;
        }
        view.onLogin(true);
        flushCookiesStore();
    };

    private handleAppLoggedOut = (event: IpcMainEvent) => {
        log.debug('handleAppLoggedOut', event.sender.id);
        const view = this.getViewByWebContentsId(event.sender.id);
        if (!view) {
            return;
        }
        view.onLogin(false);
        AppState.clear(view.id);
        flushCookiesStore();
    };

    private handleBrowserHistoryPush = (e: IpcMainEvent, pathName: string) => {
        log.debug('handleBrowserHistoryPush', e.sender.id, pathName);

        const currentView = this.getViewByWebContentsId(e.sender.id);
        if (!currentView) {
            return;
        }
        let cleanedPathName = pathName;
        if (currentView.view.server.url.pathname !== '/' && pathName.startsWith(currentView.view.server.url.pathname)) {
            cleanedPathName = pathName.replace(currentView.view.server.url.pathname, '');
        }
        const redirectedviewId = ServerManager.lookupViewByURL(`${currentView.view.server.url.toString().replace(/\/$/, '')}${cleanedPathName}`)?.id || currentView.id;
        if (this.isViewClosed(redirectedviewId)) {
            // If it's a closed view, just open it and stop
            this.openClosedView(redirectedviewId, `${currentView.view.server.url}${cleanedPathName}`);
            return;
        }
        let redirectedView = this.getView(redirectedviewId) || currentView;
        if (redirectedView !== currentView && redirectedView?.view.server.id === ServerViewState.getCurrentServer().id && redirectedView?.isLoggedIn) {
            log.info('redirecting to a new view', redirectedView?.id || currentView.id);
            this.showById(redirectedView?.id || currentView.id);
        } else {
            redirectedView = currentView;
        }

        // Special case check for Channels to not force a redirect to "/", causing a refresh
        if (!(redirectedView !== currentView && redirectedView?.view.type === TAB_MESSAGING && cleanedPathName === '/')) {
            redirectedView?.sendToRenderer(BROWSER_HISTORY_PUSH, cleanedPathName);
            redirectedView?.updateHistoryButton();
        }
    };

    private handleRequestBrowserHistoryStatus = (e: IpcMainInvokeEvent) => {
        log.silly('handleRequestBrowserHistoryStatus', e.sender.id);

        return this.getViewByWebContentsId(e.sender.id)?.getBrowserHistoryStatus();
    };

    private handleReactAppInitialized = (e: IpcMainEvent) => {
        log.debug('handleReactAppInitialized', e.sender.id);

        const view = this.getViewByWebContentsId(e.sender.id);
        if (view) {
            view.setInitialized();
            if (this.getCurrentView() === view) {
                ServersSidebar.show();
                LoadingScreen.fade();
            }
        }
    };

    private handleReloadCurrentView = () => {
        log.debug('handleReloadCurrentView');

        const view = this.getCurrentView();
        if (!view) {
            return;
        }
        view?.reload();
        this.showById(view?.id);
    };

    private handleLegacyOff = (e: IpcMainEvent) => {
        log.silly('handleLegacyOff', {webContentsId: e.sender.id});

        const view = this.getViewByWebContentsId(e.sender.id);
        if (!view) {
            return;
        }
        view.offLegacyUnreads();
    };

    // if favicon is null, it means it is the initial load,
    // so don't memoize as we don't have the favicons and there is no rush to find out.
    private handleUnreadChanged = (e: IpcMainEvent, result: boolean) => {
        log.silly('handleUnreadChanged', {webContentsId: e.sender.id, result});

        const view = this.getViewByWebContentsId(e.sender.id);
        if (!view) {
            return;
        }
        AppState.updateUnreads(view.id, result);
    };

    private handleUnreadsAndMentionsChanged = (e: IpcMainEvent, isUnread: boolean, mentionCount: number) => {
        log.silly('handleUnreadsAndMentionsChanged', {webContentsId: e.sender.id, isUnread, mentionCount});

        const view = this.getViewByWebContentsId(e.sender.id);
        if (!view) {
            return;
        }
        AppState.updateUnreads(view.id, isUnread);
        AppState.updateMentions(view.id, mentionCount);
    };

    private handleSessionExpired = (event: IpcMainEvent, isExpired: boolean) => {
        const view = this.getViewByWebContentsId(event.sender.id);
        if (!view) {
            return;
        }
        ServerManager.getViewLog(view.id, 'ViewManager').debug('handleSessionExpired', isExpired);

        AppState.updateExpired(view.id, isExpired);
    };

    private handleSetCurrentViewBounds = (newBounds: Electron.Rectangle) => {
        log.debug('handleSetCurrentViewBounds', newBounds);

        const currentView = this.getCurrentView();
        if (currentView && currentView.currentURL) {
            const adjustedBounds = getAdjustedWindowBoundaries(newBounds.width, newBounds.height, shouldHaveBackBar(currentView.view.url, currentView.currentURL), ServersSidebar.shouldDisplaySidebar);
            currentView.setBounds(adjustedBounds);
        }
    };

    /**
     * Helper functions
     */

    private openClosedView = (id: string, url?: string) => {
        if (!this.closedViews.has(id)) {
            return;
        }
        const {srv, view} = this.closedViews.get(id)!;
        view.isOpen = true;
        this.loadView(srv, view, url);
        this.showById(id);
        const browserView = this.views.get(id)!;
        browserView.isVisible = true;
        browserView.on(LOAD_SUCCESS, () => {
            browserView.isVisible = false;
            this.showById(id);
        });
        ipcMain.emit(OPEN_VIEW, null, view.id);
    };

    private getViewLogger = (viewId: string) => {
        return ServerManager.getViewLog(viewId, 'ViewManager');
    };

    private handleGetViewInfoForTest = (event: IpcMainInvokeEvent) => {
        const view = this.getViewByWebContentsId(event.sender.id);
        if (!view) {
            return null;
        }
        return {
            id: view.id,
            webContentsId: view.webContentsId,
            serverName: view.view.server.name,
            viewType: view.view.type,
        };
    };
}

const viewManager = new ViewManager();
export default viewManager;
