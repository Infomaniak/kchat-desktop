// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {BrowserView, ipcMain} from 'electron';

import ServerViewState from 'app/serverViewState';
import AppState from 'common/appState';
import {
    EMIT_CONFIGURATION,
    GET_SERVER_THEME,
    MAIN_WINDOW_CREATED,
    MAIN_WINDOW_RESIZED,
    MODAL_CLOSE,
    MODAL_OPEN,
    PREFERRED_THEME,
    SERVERS_UPDATE,
    SWITCH_SERVER,
    SWITCH_SERVER_SIDEBAR,
    TEAMS_ORDER_PREFERENCE,
    TEAMS_ORDER_PREFERENCE_UPDATED,
    UPDATE_APPSTATE,
    UPDATE_SERVERS_SIDEBAR,
    UPDATE_TEAMS,
    USER_LOCALE,
} from 'common/communication';
import {Logger} from 'common/log';
import ServerManager from 'common/servers/serverManager';
import {DEFAULT_TEAM_NAME, SERVERS_SIDEBAR_WIDTH} from 'common/utils/constants';
import {getLocalPreload, getWindowBoundaries} from 'main/utils';
import MainWindow from 'main/windows/mainWindow';

import type {ConfigServer, UniqueServer} from 'types/config';
import type {Theme} from 'types/theme';

import viewManager from './viewManager';

const log = new Logger('ServersSidebar');

export class ServerSidebar {
    private view?: BrowserView;
    private servers: UniqueServer[];
    private teams: ConfigServer[];
    private preferredTheme: Theme;
    private userLocale: string;
    private teamsOrderPreference: string[];
    private isReadyToSwitchServer: boolean;
    private shouldDisplay: boolean;
    private modalOverlayEnabled: boolean;

    private unreads: Map<string, boolean>;
    private mentions: Map<string, number>;
    private expired: Map<string, boolean>;

    private windowBounds?: Electron.Rectangle;

    constructor() {
        this.servers = [];
        this.teams = [];
        this.preferredTheme = {} as Theme;
        this.teamsOrderPreference = [];
        this.userLocale = '';
        this.isReadyToSwitchServer = false;
        this.shouldDisplay = false;
        this.modalOverlayEnabled = false;

        this.unreads = new Map();
        this.mentions = new Map();
        this.expired = new Map();

        MainWindow.on(MAIN_WINDOW_CREATED, this.init);
        MainWindow.on(MAIN_WINDOW_RESIZED, this.updateWindowBounds);
        AppState.on(UPDATE_APPSTATE, this.updateMentions);

        ipcMain.on(PREFERRED_THEME, this.updatePreferredTheme);
        ipcMain.on(USER_LOCALE, this.updateUserLocale);
        ipcMain.on(UPDATE_TEAMS, this.updateTeams);
        ipcMain.on(TEAMS_ORDER_PREFERENCE, this.updateTeamsOrderPreference);
        ipcMain.on(TEAMS_ORDER_PREFERENCE_UPDATED, this.handleUpdateTeamsOrder);
        ipcMain.on(SWITCH_SERVER, this.handleSwitchServer);
        ipcMain.on(SWITCH_SERVER_SIDEBAR, this.handleSwitchServerSidebar);
        ipcMain.on(EMIT_CONFIGURATION, this.updateServers);
        ipcMain.on(MODAL_OPEN, this.handleModalOpen);
        ipcMain.on(MODAL_CLOSE, this.handleModalClose);

        ServerManager.on(SERVERS_UPDATE, this.updateServers);
    }

    get shouldDisplaySidebar() {
        return this.shouldDisplay;
    }

    init = () => {
        const mainWindow = MainWindow.get();

        if (!mainWindow) {
            log.error('Main window was not available');
            return;
        }

        log.info('Init');

        const preload = getLocalPreload('internalAPI.js');
        this.windowBounds = MainWindow.getBounds();

        this.view = new BrowserView({
            webPreferences: {
                preload,
                session: mainWindow.webContents.session,
            },
        });

        this.setBounds();

        this.view.webContents.loadURL('kchat-desktop://renderer/serversSidebar.html').
            catch((reason) => {
                log.error(`Servers sidebar window failed to load: ${reason}`);
                log.info(process.env);
            });

        this.setOrderedServers();
    };

    hide = () => {
        const mainWindow = MainWindow.get();

        if (!mainWindow) {
            log.error('Main window was not available');
            return;
        }

        mainWindow.removeBrowserView(this.view!);
    };

    show = () => {
        const mainWindow = MainWindow.get();

        if (!mainWindow) {
            log.error('Main window was not available');
            return;
        }

        this.setBounds();

        if (this.shouldDisplay) {
            mainWindow.addBrowserView(this.view!);
        }
    };

    private countActiveTeams = () => {
        return this.teams.filter((t) => t.teamInfo.delete_at === 0).length;
    };

    private setBounds = () => {
        if (this.view) {
            const mainWindow = MainWindow.get();

            if (!mainWindow) {
                return;
            }

            const windowBoundaries = getWindowBoundaries(mainWindow, true);
            this.view.setBounds({...windowBoundaries, x: 0, width: SERVERS_SIDEBAR_WIDTH});
        }
    };

    private updateTeams = (_: any, teams: ConfigServer[]) => {
        const newTeams = teams.filter((t) => t.name !== DEFAULT_TEAM_NAME);
        const previousCount = this.countActiveTeams();

        this.teams = newTeams;
        const newCount = this.countActiveTeams();
        this.shouldDisplay = newCount > 1;
        this.updateSidebar();

        if (previousCount === 1 && newCount > 1) {
            MainWindow.emit(MAIN_WINDOW_RESIZED, MainWindow.getBounds());
            this.show();
        }

        if (previousCount > 1 && newCount === 1) {
            MainWindow.emit(MAIN_WINDOW_RESIZED, MainWindow.getBounds());
            this.hide();
        }
    };

    private updateTeamsOrderPreference = (_: any, preference: string) => {
        this.teamsOrderPreference = preference ? preference.split(',') : this.teams.map((t) => t.teamInfo?.id);
        this.updateSidebar();
    };

    private handleUpdateTeamsOrder = (_: any, order: string[]) => {
        this.teamsOrderPreference = order;
        viewManager.sendToAllViews(TEAMS_ORDER_PREFERENCE_UPDATED, order);
    };

    private updateServers = () => {
        this.setOrderedServers();
        this.updateSidebar();
    };

    private handleSwitchServer = () => {
        viewManager.getCurrentView()?.sendToRenderer(GET_SERVER_THEME);
    };

    private handleSwitchServerSidebar = (event: any, serverName: string, serverId: string) => {
        viewManager.getCurrentView()?.sendToRenderer(SWITCH_SERVER_SIDEBAR, serverId);
        ipcMain.emit(SWITCH_SERVER, event, serverName);
    };

    private updatePreferredTheme = (_: any, data: any) => {
        const theme = data.theme;
        const teamName = data.teamName;

        if (ServerViewState.hasCurrentServer() && ServerViewState.getCurrentServer().name === teamName) {
            this.preferredTheme = theme;
            this.updateSidebar();
        }
    };

    private updateUserLocale = (_: any, locale: string) => {
        this.userLocale = locale;
    };

    private updateSidebar = () => {
        log.silly('update sidebar');

        this.view?.webContents.send(
            UPDATE_SERVERS_SIDEBAR,
            this.servers,
            this.teams,
            ServerViewState.hasCurrentServer() ? ServerViewState.getCurrentServer().id : undefined,
            this.expired,
            this.mentions,
            this.unreads,
            this.windowBounds,
            this.preferredTheme,
            this.teamsOrderPreference,
            this.isReadyToSwitchServer,
            this.userLocale,
            this.modalOverlayEnabled,
        );
    };

    private handleModalOpen = () => {
        this.modalOverlayEnabled = true;
        this.updateSidebar();
    };

    private handleModalClose = () => {
        this.modalOverlayEnabled = false;
        this.updateSidebar();
    };

    private updateWindowBounds = () => {
        this.setBounds();
        this.updateSidebar();
    };

    private updateMentions = (expired: Map<string, boolean>, mentions: Map<string, number>, unreads: Map<string, boolean>) => {
        log.silly('updateMentions', {expired, mentions, unreads});

        this.unreads = this.reduceNotifications(this.unreads, unreads, (base, value) => base || value || false);
        this.mentions = this.reduceNotifications(this.mentions, mentions, (base, value) => (base ?? 0) + (value ?? 0));
        this.expired = this.reduceNotifications(this.expired, expired, (base, value) => base || value || false);
        this.updateSidebar();
    };

    private reduceNotifications = <T>(inputMap: Map<string, T>, items: Map<string, T>, modifier: (base?: T, value?: T) => T) => {
        inputMap.clear();
        return [...items.keys()].reduce((map, key) => {
            const view = ServerManager.getView(key);
            if (!view) {
                return map;
            }
            map.set(view.server.id, modifier(map.get(view.server.id), items.get(key)));
            return map;
        }, inputMap);
    };

    private setOrderedServers = () => {
        this.servers = ServerManager.getOrderedServers().map((server) => server.toUniqueServer());
    };
}

const serversSidebar = new ServerSidebar();
export default serversSidebar;
