// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable max-lines */
import path from 'path';

import {app, BrowserWindow, nativeImage, systemPreferences, ipcMain, IpcMainEvent, IpcMainInvokeEvent, desktopCapturer} from 'electron';
import log from 'electron-log';

import {
    CallsJoinCallMessage,
} from 'types/calls';

import {
    MAXIMIZE_CHANGE,
    HISTORY,
    GET_LOADING_SCREEN_DATA,
    REACT_APP_INITIALIZED,
    LOADING_SCREEN_ANIMATION_FINISHED,
    FOCUS_THREE_DOT_MENU,
    GET_DARK_MODE,
    UPDATE_SHORTCUT_MENU,
    BROWSER_HISTORY_PUSH,
    APP_LOGGED_IN,
    GET_VIEW_NAME,
    GET_VIEW_WEBCONTENTS_ID,
    RESIZE_MODAL,
    APP_LOGGED_OUT,
    BROWSER_HISTORY_BUTTON,
    CALL_JOINED,
    CALL_CLOSED,
    WINDOW_WILL_UNLOADED,
    DISPATCH_GET_DESKTOP_SOURCES,
    DESKTOP_SOURCES_RESULT,
    RELOAD_CURRENT_VIEW,
    CALL_RINGING,
    TOKEN_REFRESHED,
    TOKEN_REQUEST,
    VIEW_FINISHED_RESIZING,
    CALLS_JOIN_CALL,
    CALLS_LEAVE_CALL,
    DESKTOP_SOURCES_MODAL_REQUEST,
    CALLS_WIDGET_CHANNEL_LINK_CLICK,
    REFRESH_TOKEN,
    RESET_TOKEN,
    SERVER_ADDED,
    SERVER_DELETED,
    RESET_AUTH,
    RESET_TEAMS,
} from 'common/communication';
import urlUtils from 'common/utils/url';
import {SECOND} from 'common/utils/constants';
import Config from 'common/config';
import {getTabViewName, TAB_MESSAGING} from 'common/tabs/TabView';

import {MattermostView} from 'main/views/MattermostView';

import {getAdjustedWindowBoundaries, shouldHaveBackBar} from '../utils';

import {ViewManager, LoadingScreenState} from '../views/viewManager';
import CriticalErrorHandler from '../CriticalErrorHandler';

import TeamDropdownView from '../views/teamDropdownView';
import DownloadsDropdownView from '../views/downloadsDropdownView';
import DownloadsDropdownMenuView from '../views/downloadsDropdownMenuView';

import downloadsManager from 'main/downloadsManager';

import TokenManager from 'main/tokenManager';

import {updateServerInfos} from 'main/app/utils';

import {createSettingsWindow} from './settingsWindow';
import createMainWindow from './mainWindow';
import {createCallWindow} from './callWindow';
import {createCallDialingWindow} from './callDialingWindow';

// eslint-disable-next-line import/no-commonjs
import CallsWidgetWindow from './callsWidgetWindow';

const {setupScreenSharingMain, setupAlwaysOnTopMain, initPopupsConfigurationMain, setupPowerMonitorMain} = require('@jitsi/electron-sdk');

type SuiteTeam = {
    id: string;
    create_at: number;
    update_at: number;
    delete_at: number;
    display_name: string;
    name: string;
    product_id: number;
    account_id: number;
    description: string;
    email: string;
    type: string;
    company_name: string;
    allowed_domains: string;
    invite_id: string;
    scheme_id: string | void;
    policy_id: string | void;
    allow_open_invite: boolean;
    group_constrained: number | void;
    url: string;
    pack_name: string;
    last_team_icon_update: number;
}

// singleton module to manage application's windows

export class WindowManager {
    assetsDir: string;

    mainWindow?: BrowserWindow;
    mainWindowReady: boolean;
    settingsWindow?: BrowserWindow;
    callWindow?: BrowserWindow;
    callsWidgetWindow?: CallsWidgetWindow;
    viewManager?: ViewManager;
    teamDropdown?: TeamDropdownView;
    downloadsDropdown?: DownloadsDropdownView;
    downloadsDropdownMenu?: DownloadsDropdownMenuView;
    currentServerName?: string;

    constructor() {
        this.mainWindowReady = false;
        this.assetsDir = path.resolve(app.getAppPath(), 'assets');
        ipcMain.on(HISTORY, this.handleHistory);
        ipcMain.handle(GET_LOADING_SCREEN_DATA, this.handleLoadingScreenDataRequest);
        ipcMain.handle(GET_DARK_MODE, this.handleGetDarkMode);
        ipcMain.on(REACT_APP_INITIALIZED, this.handleReactAppInitialized);
        ipcMain.on(LOADING_SCREEN_ANIMATION_FINISHED, this.handleLoadingScreenAnimationFinished);
        ipcMain.on(BROWSER_HISTORY_PUSH, this.handleBrowserHistoryPush);
        ipcMain.on(BROWSER_HISTORY_BUTTON, this.handleBrowserHistoryButton);
        ipcMain.on(APP_LOGGED_IN, this.handleAppLoggedIn);
        ipcMain.on(APP_LOGGED_OUT, this.handleAppLoggedOut);
        ipcMain.on(CALL_JOINED, this.handleCallJoined);
        ipcMain.on(CALL_RINGING, this.handleCallDialing);
        ipcMain.handle(GET_VIEW_NAME, this.handleGetViewName);
        ipcMain.handle(GET_VIEW_WEBCONTENTS_ID, this.handleGetWebContentsId);
        ipcMain.on(DISPATCH_GET_DESKTOP_SOURCES, this.handleGetDesktopSources);
        ipcMain.on(RELOAD_CURRENT_VIEW, this.handleReloadCurrentView);
        ipcMain.on(VIEW_FINISHED_RESIZING, this.handleViewFinishedResizing);
        ipcMain.on(CALLS_JOIN_CALL, this.createCallsWidgetWindow);
        ipcMain.on(CALLS_LEAVE_CALL, () => this.callsWidgetWindow?.close());
        ipcMain.on(DESKTOP_SOURCES_MODAL_REQUEST, this.handleDesktopSourcesModalRequest);
        ipcMain.on(CALLS_WIDGET_CHANNEL_LINK_CLICK, this.handleCallsWidgetChannelLinkClick);
        ipcMain.handle(TOKEN_REQUEST, this.handleTokenRequest);
        ipcMain.handle(REFRESH_TOKEN, async () => {
            const token = await TokenManager.handleRefreshToken();
            return token;
        });
        ipcMain.on(TOKEN_REFRESHED, this.handleTokenRefreshed);
        ipcMain.on(RESET_TOKEN, this.handleResetToken);
        ipcMain.handle(SERVER_ADDED, this.handleAddServer);
        ipcMain.handle(SERVER_DELETED, this.handleDeleteServer);
        ipcMain.handle(RESET_AUTH, this.handleRevokeToken);
        ipcMain.handle(RESET_TEAMS, this.resetTeams);
    }

    handleUpdateConfig = () => {
        if (this.viewManager) {
            this.viewManager.reloadConfiguration(Config.teams || []);
        }
    }

    createCallsWidgetWindow = (event: IpcMainEvent, viewName: string, msg: CallsJoinCallMessage) => {
        log.debug('WindowManager.createCallsWidgetWindow');
        if (this.callsWidgetWindow) {
            // trying to join again the call we are already in should not be allowed.
            if (this.callsWidgetWindow.getCallID() === msg.callID) {
                return;
            }
            this.callsWidgetWindow.close();
        }
        const currentView = this.viewManager?.views.get(viewName);
        if (!currentView) {
            log.error('unable to create calls widget window: currentView is missing');
            return;
        }

        this.callsWidgetWindow = new CallsWidgetWindow(this.mainWindow!, currentView, {
            siteURL: currentView.serverInfo.remoteInfo.siteURL!,
            callID: msg.callID,
            title: msg.title,
            serverName: this.currentServerName!,
            channelURL: msg.channelURL,
        });

        this.callsWidgetWindow.on('closed', () => delete this.callsWidgetWindow);
    }

    handleDesktopSourcesModalRequest = () => {
        log.debug('WindowManager.handleDesktopSourcesModalRequest');

        if (this.callsWidgetWindow) {
            this.switchServer(this.callsWidgetWindow?.getServerName());
            this.mainWindow?.focus();
            const currentView = this.viewManager?.getCurrentView();
            currentView?.view.webContents.send(DESKTOP_SOURCES_MODAL_REQUEST);
        }
    }

    handleCallsWidgetChannelLinkClick = () => {
        log.debug('WindowManager.handleCallsWidgetChannelLinkClick');
        if (this.callsWidgetWindow) {
            this.switchServer(this.callsWidgetWindow.getServerName());
            this.mainWindow?.focus();
            const currentView = this.viewManager?.getCurrentView();
            currentView?.view.webContents.send(BROWSER_HISTORY_PUSH, this.callsWidgetWindow.getChannelURL());
        }
    }

    showSettingsWindow = () => {
        log.debug('WindowManager.showSettingsWindow');

        if (this.settingsWindow) {
            this.settingsWindow.show();
        } else {
            if (!this.mainWindow) {
                this.showMainWindow();
            }
            const withDevTools = Boolean(process.env.MM_DEBUG_SETTINGS) || false;

            this.settingsWindow = createSettingsWindow(this.mainWindow!, withDevTools);
            this.settingsWindow.on('closed', () => {
                delete this.settingsWindow;
            });
        }
    }

    showMainWindow = (deeplinkingURL?: string | URL) => {
        log.debug('WindowManager.showMainWindow', deeplinkingURL);

        if (this.mainWindow) {
            if (this.mainWindow.isVisible()) {
                this.mainWindow.focus();
            } else {
                this.mainWindow.show();
            }
        } else {
            this.mainWindowReady = false;
            this.mainWindow = createMainWindow({
                linuxAppIcon: path.join(this.assetsDir, 'linux', 'app_icon.png'),
            });

            if (!this.mainWindow) {
                log.error('unable to create main window');
                app.quit();
                return;
            }

            this.mainWindow.once('ready-to-show', () => {
                this.mainWindowReady = true;
            });

            // window handlers
            this.mainWindow.on('closed', () => {
                log.warn('main window closed');
                delete this.mainWindow;
                this.mainWindowReady = false;
            });
            this.mainWindow.on('unresponsive', () => {
                CriticalErrorHandler.setMainWindow(this.mainWindow!);
                CriticalErrorHandler.windowUnresponsiveHandler();
            });
            this.mainWindow.on('maximize', this.handleMaximizeMainWindow);
            this.mainWindow.on('unmaximize', this.handleUnmaximizeMainWindow);
            if (process.platform !== 'darwin') {
                this.mainWindow.on('resize', this.handleResizeMainWindow);
            }
            this.mainWindow.on('will-resize', this.handleWillResizeMainWindow);
            this.mainWindow.on('resized', this.handleResizedMainWindow);
            this.mainWindow.on('focus', this.focusBrowserView);
            this.mainWindow.on('enter-full-screen', () => this.sendToRenderer('enter-full-screen'));
            this.mainWindow.on('leave-full-screen', () => this.sendToRenderer('leave-full-screen'));

            if (process.env.MM_DEBUG_SETTINGS) {
                this.mainWindow.webContents.openDevTools({mode: 'detach'});
            }

            if (this.viewManager) {
                this.viewManager.updateMainWindow(this.mainWindow);
            }

            this.teamDropdown = new TeamDropdownView(this.mainWindow, Config.teams, Config.darkMode, Config.enableServerManagement);
            this.downloadsDropdown = new DownloadsDropdownView(this.mainWindow, downloadsManager.getDownloads(), Config.darkMode);
            this.downloadsDropdownMenu = new DownloadsDropdownMenuView(this.mainWindow, Config.darkMode);
        }
        this.initializeViewManager();

        if (deeplinkingURL) {
            this.viewManager!.handleDeepLink(deeplinkingURL);
        }
    }

    getMainWindow = (ensureCreated?: boolean) => {
        if (ensureCreated && !this.mainWindow) {
            this.showMainWindow();
        }
        return this.mainWindow;
    }

    on = this.mainWindow?.on;

    handleMaximizeMainWindow = () => {
        this.downloadsDropdown?.updateWindowBounds();
        this.downloadsDropdownMenu?.updateWindowBounds();
        this.sendToRenderer(MAXIMIZE_CHANGE, true);
    }

    handleUnmaximizeMainWindow = () => {
        this.downloadsDropdown?.updateWindowBounds();
        this.downloadsDropdownMenu?.updateWindowBounds();
        this.sendToRenderer(MAXIMIZE_CHANGE, false);
    }

    isResizing = false;

    handleWillResizeMainWindow = (event: Event, newBounds: Electron.Rectangle) => {
        log.silly('WindowManager.handleWillResizeMainWindow');

        if (!(this.viewManager && this.mainWindow)) {
            return;
        }

        /**
         * Fixes an issue on win11 related to Snap where the first "will-resize" event would return the same bounds
         * causing the "resize" event to not fire
         */
        const prevBounds = this.getBounds();
        if (prevBounds.height === newBounds.height && prevBounds.width === newBounds.width) {
            return;
        }

        if (this.isResizing && this.viewManager.loadingScreenState === LoadingScreenState.HIDDEN && this.viewManager.getCurrentView()) {
            log.debug('prevented resize');
            event.preventDefault();
            return;
        }

        this.throttledWillResize(newBounds);
        this.viewManager?.setLoadingScreenBounds();
        this.teamDropdown?.updateWindowBounds();
        this.downloadsDropdown?.updateWindowBounds();
        this.downloadsDropdownMenu?.updateWindowBounds();
        ipcMain.emit(RESIZE_MODAL, null, newBounds);
    }

    handleResizedMainWindow = () => {
        log.silly('WindowManager.handleResizedMainWindow');

        if (this.mainWindow) {
            const bounds = this.getBounds();
            this.throttledWillResize(bounds);
            ipcMain.emit(RESIZE_MODAL, null, bounds);
            this.teamDropdown?.updateWindowBounds();
            this.downloadsDropdown?.updateWindowBounds();
            this.downloadsDropdownMenu?.updateWindowBounds();
        }
        this.isResizing = false;
    }

    handleViewFinishedResizing = () => {
        this.isResizing = false;
    }

    private throttledWillResize = (newBounds: Electron.Rectangle) => {
        log.silly('WindowManager.throttledWillResize', {newBounds});

        this.isResizing = true;
        this.setCurrentViewBounds(newBounds);
    }

    handleResizeMainWindow = () => {
        log.silly('WindowManager.handleResizeMainWindow');

        if (!(this.viewManager && this.mainWindow)) {
            return;
        }
        if (this.isResizing) {
            return;
        }

        const bounds = this.getBounds();

        // Another workaround since the window doesn't update properly under Linux for some reason
        // See above comment
        setTimeout(this.setCurrentViewBounds, 10, bounds);
        this.viewManager.setLoadingScreenBounds();
        this.teamDropdown?.updateWindowBounds();
        this.downloadsDropdown?.updateWindowBounds();
        this.downloadsDropdownMenu?.updateWindowBounds();
        ipcMain.emit(RESIZE_MODAL, null, bounds);
    };

    setCurrentViewBounds = (bounds: {width: number; height: number}) => {
        log.debug('WindowManager.setCurrentViewBounds', {bounds});

        const currentView = this.viewManager?.getCurrentView();
        if (currentView) {
            const adjustedBounds = getAdjustedWindowBoundaries(bounds.width, bounds.height, shouldHaveBackBar(currentView.tab.url, currentView.view.webContents.getURL()));
            this.setBoundsFunction(currentView, adjustedBounds);
        }
    }

    private setBoundsFunction = (currentView: MattermostView, bounds: Electron.Rectangle) => {
        log.silly('setBoundsFunction', bounds.width, bounds.height);
        currentView.setBounds(bounds);
    };

    private getBounds = () => {
        let bounds;

        if (this.mainWindow) {
            // Workaround for linux maximizing/minimizing, which doesn't work properly because of these bugs:
            // https://github.com/electron/electron/issues/28699
            // https://github.com/electron/electron/issues/28106
            if (process.platform === 'linux') {
                const size = this.mainWindow.getSize();
                bounds = {width: size[0], height: size[1]};
            } else {
                bounds = this.mainWindow.getContentBounds();
            }
        }

        return bounds as Electron.Rectangle;
    }

    // max retries allows the message to get to the renderer even if it is sent while the app is starting up.
    sendToRendererWithRetry = (maxRetries: number, channel: string, ...args: unknown[]) => {
        if (!this.mainWindow || !this.mainWindowReady) {
            if (maxRetries > 0) {
                log.info(`Can't send ${channel}, will retry`);
                setTimeout(() => {
                    this.sendToRendererWithRetry(maxRetries - 1, channel, ...args);
                }, SECOND);
            } else {
                log.error(`Unable to send the message to the main window for message type ${channel}`);
            }
            return;
        }
        this.mainWindow!.webContents.send(channel, ...args);
        if (this.settingsWindow && this.settingsWindow.isVisible()) {
            try {
                this.settingsWindow.webContents.send(channel, ...args);
            } catch (e) {
                log.error(`There was an error while trying to communicate with the renderer: ${e}`);
            }
        }
    }

    sendToRenderer = (channel: string, ...args: unknown[]) => {
        this.sendToRendererWithRetry(3, channel, ...args);
    }

    sendToAll = (channel: string, ...args: unknown[]) => {
        this.sendToRenderer(channel, ...args);
        if (this.settingsWindow) {
            this.settingsWindow.webContents.send(channel, ...args);
        }

        // TODO: should we include popups?
    }

    sendToMattermostViews = (channel: string, ...args: unknown[]) => {
        if (this.viewManager) {
            this.viewManager.sendToAllViews(channel, ...args);
        }
    }

    restoreMain = () => {
        log.info('restoreMain');
        if (!this.mainWindow) {
            this.showMainWindow();
        }
        if (!this.mainWindow!.isVisible() || this.mainWindow!.isMinimized()) {
            if (this.mainWindow!.isMinimized()) {
                this.mainWindow!.restore();
            } else {
                this.mainWindow!.show();
            }
            if (this.settingsWindow) {
                this.settingsWindow.focus();
            } else {
                this.mainWindow!.focus();
            }
        } else if (this.settingsWindow) {
            this.settingsWindow.focus();
        } else {
            this.mainWindow!.focus();
        }
    }

    flashFrame = (flash: boolean) => {
        if (process.platform === 'linux' || process.platform === 'win32') {
            if (Config.notifications.flashWindow) {
                this.mainWindow?.flashFrame(flash);
            }
        }
        if (process.platform === 'darwin' && Config.notifications.bounceIcon) {
            app.dock.bounce(Config.notifications.bounceIconType);
        }
    }

    drawBadge = (text: string, small: boolean) => {
        const scale = 2; // should rely display dpi
        const size = (small ? 20 : 16) * scale;
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', `${size}`);
        canvas.setAttribute('height', `${size}`);
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            log.error('Could not create canvas context');
            return null;
        }

        // circle
        ctx.fillStyle = '#FF1744'; // Material Red A400
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();

        // text
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = (11 * scale) + 'px sans-serif';
        ctx.fillText(text, size / 2, size / 2, size);

        return canvas.toDataURL();
    }

    createDataURL = (text: string, small: boolean) => {
        const win = this.mainWindow;
        if (!win) {
            return null;
        }

        // since we don't have a document/canvas object in the main process, we use the webcontents from the window to draw.
        const safeSmall = Boolean(small);
        const code = `
        window.drawBadge = ${this.drawBadge};
        window.drawBadge('${text || ''}', ${safeSmall});
      `;
        return win.webContents.executeJavaScript(code);
    }

    setOverlayIcon = async (badgeText: string | undefined, description: string, small: boolean) => {
        if (process.platform === 'win32') {
            let overlay = null;
            if (this.mainWindow) {
                if (badgeText) {
                    try {
                        const dataUrl = await this.createDataURL(badgeText, small);
                        overlay = nativeImage.createFromDataURL(dataUrl);
                    } catch (err) {
                        log.error(`Couldn't generate a badge: ${err}`);
                    }
                }
                this.mainWindow.setOverlayIcon(overlay, description);
            }
        }
    }

    isMainWindow = (window: BrowserWindow) => {
        return this.mainWindow && this.mainWindow === window;
    }

    handleDoubleClick = (e: IpcMainEvent, windowType?: string) => {
        log.debug('WindowManager.handleDoubleClick', windowType);

        let action = 'Maximize';
        if (process.platform === 'darwin') {
            action = systemPreferences.getUserDefault('AppleActionOnDoubleClick', 'string');
        }
        const win = (windowType === 'settings') ? this.settingsWindow : this.mainWindow;
        if (!win) {
            return;
        }
        switch (action) {
        case 'Minimize':
            if (win.isMinimized()) {
                win.restore();
            } else {
                win.minimize();
            }
            break;
        case 'Maximize':
        default:
            if (win.isMaximized()) {
                win.unmaximize();
            } else {
                win.maximize();
            }
            break;
        }
    }

    initializeViewManager = () => {
        if (!this.viewManager && Config && this.mainWindow) {
            this.viewManager = new ViewManager(this.mainWindow);
            this.viewManager.load();
            this.viewManager.showInitial();

            TokenManager.load().finally((r) => {
                this.initializeCurrentServerName();
            });
        }
    }

    initializeCurrentServerName = () => {
        if (!this.currentServerName) {
            this.currentServerName = (Config.teams.find((team) => team.order === Config.lastActiveTeam) || Config.teams.find((team) => team.order === 0))?.name;
        }
    }

    switchServer = (serverName: string, waitForViewToExist = false) => {
        log.debug('windowManager.switchServer');
        this.showMainWindow();
        const server = Config.teams.find((team) => team.name === serverName);
        if (!server) {
            log.error('Cannot find server in config');
            return;
        }
        this.currentServerName = serverName;
        let nextTab = server.tabs.find((tab) => tab.isOpen && tab.order === (server.lastActiveTab || 0));
        if (!nextTab) {
            const openTabs = server.tabs.filter((tab) => tab.isOpen);
            nextTab = openTabs.find((e) => e.order === 0) || openTabs.concat().sort((a, b) => a.order - b.order)[0];
        }
        const tabViewName = getTabViewName(serverName, nextTab.name);
        if (waitForViewToExist) {
            const timeout = setInterval(() => {
                if (this.viewManager?.views.has(tabViewName)) {
                    this.viewManager?.showByName(tabViewName);
                    clearTimeout(timeout);
                }
            }, 100);
        } else {
            this.viewManager?.showByName(tabViewName);
        }
        ipcMain.emit(UPDATE_SHORTCUT_MENU);
    }

    switchTab = (serverName: string, tabName: string) => {
        log.debug('windowManager.switchTab');
        this.showMainWindow();
        const tabViewName = getTabViewName(serverName, tabName);
        this.viewManager?.showByName(tabViewName);
    }

    focusBrowserView = () => {
        log.debug('WindowManager.focusBrowserView');

        if (this.viewManager) {
            this.viewManager.focus();
        } else {
            log.error('Trying to call focus when the viewManager has not yet been initialized');
        }
    }

    openBrowserViewDevTools = () => {
        if (this.viewManager) {
            this.viewManager.openViewDevTools();
        }
    }

    focusThreeDotMenu = () => {
        if (this.mainWindow) {
            this.mainWindow.webContents.focus();
            this.mainWindow.webContents.send(FOCUS_THREE_DOT_MENU);
        }
    }

    handleLoadingScreenDataRequest = () => {
        return {
            darkMode: Config.darkMode || false,
        };
    }

    handleReactAppInitialized = (e: IpcMainEvent, view: string) => {
        log.debug('WindowManager.handleReactAppInitialized', view);

        if (this.viewManager) {
            this.viewManager.setServerInitialized(view);
        }
    }

    handleLoadingScreenAnimationFinished = () => {
        log.debug('WindowManager.handleLoadingScreenAnimationFinished');

        if (this.viewManager) {
            this.viewManager.hideLoadingScreen();
        }
    }

    updateLoadingScreenDarkMode = (darkMode: boolean) => {
        if (this.viewManager) {
            this.viewManager.updateLoadingScreenDarkMode(darkMode);
        }
    }

    getViewNameByWebContentsId = (webContentsId: number) => {
        const view = this.viewManager?.findViewByWebContent(webContentsId);
        return view?.name;
    }

    getServerNameByWebContentsId = (webContentsId: number) => {
        const view = this.viewManager?.findViewByWebContent(webContentsId);
        return view?.tab.server.name;
    }

    close = () => {
        const focused = BrowserWindow.getFocusedWindow();
        focused?.close();
    }
    maximize = () => {
        const focused = BrowserWindow.getFocusedWindow();
        if (focused) {
            focused.maximize();
        }
    }
    minimize = () => {
        const focused = BrowserWindow.getFocusedWindow();
        if (focused) {
            focused.minimize();
        }
    }
    restore = () => {
        const focused = BrowserWindow.getFocusedWindow();
        if (focused) {
            focused.restore();
        }
        if (focused?.isFullScreen()) {
            focused.setFullScreen(false);
        }
    }

    reload = () => {
        const currentView = this.viewManager?.getCurrentView();
        if (currentView) {
            this.viewManager?.showLoadingScreen();
            currentView.reload();
        }
    }

    sendToFind = () => {
        const currentView = this.viewManager?.getCurrentView();
        if (currentView) {
            currentView.view.webContents.sendInputEvent({type: 'keyDown', keyCode: 'F', modifiers: [process.platform === 'darwin' ? 'cmd' : 'ctrl', 'shift']});
        }
    }

    handleHistory = (event: IpcMainEvent, offset: number) => {
        log.debug('WindowManager.handleHistory', offset);

        if (this.viewManager) {
            const activeView = this.viewManager.getCurrentView();
            if (activeView && activeView.view.webContents.canGoToOffset(offset)) {
                try {
                    activeView.view.webContents.goToOffset(offset);
                } catch (error) {
                    log.error(error);
                    activeView.load(activeView.tab.url);
                }
            }
        }
    }

    selectNextTab = () => {
        this.selectTab((order) => order + 1);
    }

    selectPreviousTab = () => {
        this.selectTab((order, length) => (length + (order - 1)));
    }

    selectTab = (fn: (order: number, length: number) => number) => {
        const currentView = this.viewManager?.getCurrentView();
        if (!currentView) {
            return;
        }

        const currentTeamTabs = Config.teams.find((team) => team.name === currentView.tab.server.name)?.tabs;
        const filteredTabs = currentTeamTabs?.filter((tab) => tab.isOpen);
        const currentTab = currentTeamTabs?.find((tab) => tab.name === currentView.tab.type);
        if (!currentTeamTabs || !currentTab || !filteredTabs) {
            return;
        }

        let currentOrder = currentTab.order;
        let nextIndex = -1;
        while (nextIndex === -1) {
            const nextOrder = (fn(currentOrder, currentTeamTabs.length) % currentTeamTabs.length);
            nextIndex = filteredTabs.findIndex((tab) => tab.order === nextOrder);
            currentOrder = nextOrder;
        }

        const newTab = filteredTabs[nextIndex];
        this.switchTab(currentView.tab.server.name, newTab.name);
    }

    handleGetDarkMode = () => {
        return Config.darkMode;
    }

    handleBrowserHistoryPush = (e: IpcMainEvent, viewName: string, pathName: string) => {
        log.debug('WindowManager.handleBrowserHistoryPush', {viewName, pathName});

        const currentView = this.viewManager?.views.get(viewName);
        const cleanedPathName = urlUtils.cleanPathName(currentView?.tab.server.url.pathname || '', pathName);
        const redirectedViewName = urlUtils.getView(`${currentView?.tab.server.url}${cleanedPathName}`, Config.teams)?.name || viewName;
        if (this.viewManager?.closedViews.has(redirectedViewName)) {
            // If it's a closed view, just open it and stop
            this.viewManager.openClosedTab(redirectedViewName, `${currentView?.tab.server.url}${cleanedPathName}`);
            return;
        }
        let redirectedView = this.viewManager?.views.get(redirectedViewName) || currentView;
        if (redirectedView !== currentView && redirectedView?.tab.server.name === this.currentServerName && redirectedView?.isLoggedIn) {
            log.info('redirecting to a new view', redirectedView?.name || viewName);
            this.viewManager?.showByName(redirectedView?.name || viewName);
        } else {
            redirectedView = currentView;
        }

        // Special case check for Channels to not force a redirect to "/", causing a refresh
        if (!(redirectedView !== currentView && redirectedView?.tab.type === TAB_MESSAGING && cleanedPathName === '/')) {
            redirectedView?.view.webContents.send(BROWSER_HISTORY_PUSH, cleanedPathName);
            if (redirectedView) {
                this.handleBrowserHistoryButton(e, redirectedView.name);
            }
        }
    }

    handleBrowserHistoryButton = (e: IpcMainEvent, viewName: string) => {
        log.debug('WindowManager.handleBrowserHistoryButton', viewName);

        const currentView = this.viewManager?.views.get(viewName);
        if (currentView) {
            if (currentView.view.webContents.getURL() === currentView.tab.url.toString()) {
                currentView.view.webContents.clearHistory();
                currentView.isAtRoot = true;
            } else {
                currentView.isAtRoot = false;
            }
            currentView?.view.webContents.send(BROWSER_HISTORY_BUTTON, currentView.view.webContents.canGoBack(), currentView.view.webContents.canGoForward());
        }
    }

    getCurrentTeamName = () => {
        return this.currentServerName;
    }

    handleAppLoggedIn = (event: IpcMainEvent, viewName: string) => {
        log.debug('WindowManager.handleAppLoggedIn', viewName);

        const view = this.viewManager?.views.get(viewName);
        if (view && !view.isLoggedIn) {
            view.isLoggedIn = true;
            this.viewManager?.reloadViewIfNeeded(viewName);
        }
    }

    handleCallDialing = (event: IpcMainEvent, message, viewName: string) => {
        const withDevTools = Boolean(process.env.MM_DEBUG_SETTINGS) || false;

        // this.dialingWindow = createCallDialingWindow(this.mainWindow!, withDevTools);
        createCallDialingWindow(this.mainWindow!, withDevTools, message.calling);
    }

    handleCallJoined = (event: IpcMainEvent, message, viewName: string) => {
        if (this.callWindow) {
            this.callWindow.show();
        } else {
            // if (!this.mainWindow) {
            //     this.showMainWindow();
            // }
            const withDevTools = Boolean(process.env.MM_DEBUG_SETTINGS) || false;

            this.callWindow = createCallWindow(this.mainWindow!, withDevTools, message.id, message.url, message.name, message.avatar, message.username);
            initPopupsConfigurationMain(this.callWindow);
            setupScreenSharingMain(this.callWindow, 'kChat', 'com.infomaniak.kchat');
            setupAlwaysOnTopMain(this.callWindow);
            setupPowerMonitorMain(this.callWindow);

            // setupScreenSharingMain(mainWindow, config.default.appName, pkgJson.build.appId);
            ipcMain.on(CALL_CLOSED, () => {
                if (this.callWindow?.close) {
                    this.callWindow.close();
                }
                this.callWindow = undefined;
            });

            ipcMain.on('call-focus', () => {
                this.callWindow?.focus();
            });

            ipcMain.on('call-audio-status-change', (_, status) => {
                const currentView = this.viewManager?.views.get(viewName);
                currentView?.view.webContents.send('call-audio-status-change', status.muted);
            });

            ipcMain.on('call-video-status-change', (_, status) => {
                const currentView = this.viewManager?.views.get(viewName);
                currentView?.view.webContents.send('call-video-status-change', status.muted);
            });

            ipcMain.on('call-ss-status-change', (_, status) => {
                const currentView = this.viewManager?.views.get(viewName);
                currentView?.view.webContents.send('call-ss-status-change', status.on);
            });

            ipcMain.on(WINDOW_WILL_UNLOADED, () => {
                if (this.callWindow) {
                    this.callWindow.focus();
                    if (this.callWindow.close) {
                        this.callWindow.close();
                    }
                    delete this.callWindow;
                }
            });

            this.callWindow.on('closed', () => {
                delete this.callWindow;
                const currentView = this.viewManager?.views.get(viewName);
                currentView?.view.webContents.send(CALL_CLOSED, message.id);
            });
        }
    }

    handleAppLoggedOut = (event: IpcMainEvent, viewName: string) => {
        log.debug('WindowManager.handleAppLoggedOut', viewName);

        const view = this.viewManager?.views.get(viewName);
        if (view && view.isLoggedIn) {
            view.isLoggedIn = false;
        }
    }

    handleGetViewName = (event: IpcMainInvokeEvent) => {
        return this.getViewNameByWebContentsId(event.sender.id);
    }

    handleGetWebContentsId = (event: IpcMainInvokeEvent) => {
        return event.sender.id;
    }

    getCurrentServerUrl = (): string => {
        const server = Config.teams.find((team) => team.name === this.getCurrentTeamName());
        if (!server) {
            log.error('Cannot find server in config');
            return '';
        }
        return server.url;
    }

    handleGetDesktopSources = async (event: IpcMainEvent, viewName: string, opts: Electron.SourcesOptions) => {
        log.debug('WindowManager.handleGetDesktopSources', {viewName, opts});

        const globalWidget = viewName === 'widget' && this.callsWidgetWindow;
        const view = this.viewManager?.views.get(viewName);
        if (!view && !globalWidget) {
            return;
        }

        desktopCapturer.getSources(opts).then((sources) => {
            const message = sources.map((source) => {
                return {
                    id: source.id,
                    name: source.name,
                    thumbnailURL: source.thumbnail.toDataURL(),
                };
            });

            if (view) {
                view.view.webContents.send(DESKTOP_SOURCES_RESULT, message);
            } else {
                this.callsWidgetWindow?.win.webContents.send(DESKTOP_SOURCES_RESULT, message);
            }
        });
    }

    handleReloadCurrentView = () => {
        log.debug('WindowManager.handleReloadCurrentView');

        const view = this.viewManager?.getCurrentView();
        if (!view) {
            return;
        }
        view?.reload();
        this.viewManager?.showByName(view?.name);
    }

    handleTokenRefreshed = (event: IpcMainEvent, message: any) => {
        if (message.token) {
            TokenManager.handleStoreToken(event, message);
        }
    }

    resetTeams = () => {
        // TokenManager.reset();
        Config.set('teams', [{
            name: '.',
            url: 'https://kchat.infomaniak.com',
            order: 0,
            tabs: [{name: 'TAB_MESSAGING', order: 0, isOpen: true}],
        }]);
        this.reload();
    }

    handleResetToken = () => {
        TokenManager.reset();
    }

    handleTokenRequest = () => {
        const token = TokenManager.getToken();
        return token;
    }

    handleAddServer = (event: IpcMainInvokeEvent, message: SuiteTeam) => {
        const newTeams = Config.teams;

        const team = {
            name: message.display_name,
            url: message.url,
            order: newTeams.length,
            tabs: [{name: 'TAB_MESSAGING', order: 0, isOpen: true}],
        };

        newTeams.push(team);
        updateServerInfos(newTeams, true);
    }

    handleDeleteServer = (_: IpcMainInvokeEvent, message: SuiteTeam) => {
        let newTeams = Config.teams;

        // filter out predefined teams
        newTeams = newTeams.filter((newTeam) => {
            return newTeam.url === message.url; // eslint-disable-line max-nested-callbacks
        });

        updateServerInfos(newTeams, true);
    }

    handleRevokeToken = async () => {
        const token = TokenManager.getToken();
        if (Object.keys(token).length) {
            await TokenManager.handleRevokeToken();
        }
    }
}

const windowManager = new WindowManager();
export default windowManager;
