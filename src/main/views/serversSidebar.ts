// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {BrowserView, ipcMain} from 'electron';

import {ConfigServer, UniqueServer} from 'types/config';

import {Theme} from 'types/theme';

import {
    DARK_MODE_CHANGE,
    EMIT_CONFIGURATION,
    MAIN_WINDOW_CREATED,
    MAIN_WINDOW_RESIZED,
    PREFERRED_THEME,
    SERVERS_UPDATE, SWITCH_SERVER, TEAMS_ORDER_PREFERENCE, TEAMS_ORDER_PREFERENCE_UPDATED, UPDATE_APPSTATE,
    UPDATE_SERVERS_SIDEBAR,
    UPDATE_TEAMS,
    USER_LOCALE,
} from 'common/communication';

import {Logger} from 'common/log';
import {composeUserAgent, getLocalPreload, getLocalURLString, getWindowBoundaries} from 'main/utils';
import MainWindow from 'main/windows/mainWindow';
import {DEFAULT_TEAM_NAME, SERVERS_SIDEBAR_WIDTH} from 'common/utils/constants';
import ServerManager from 'common/servers/serverManager';
import ServerViewState from 'app/serverViewState';
import AppState from 'common/appState';

import viewManager from './viewManager';

const log = new Logger('ServersSidebar');

export class ServerSidebar {
    private view?: BrowserView;
    private servers: UniqueServer[];
    private teams: ConfigServer[];
    private preferredTheme: Theme
    private userLocale: string
    private teamsOrderPreference: string[]

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

        ServerManager.on(SERVERS_UPDATE, this.updateServers);
        ServerManager.on(SWITCH_SERVER, this.updateServers);
        ipcMain.on(EMIT_CONFIGURATION, this.updateServers);
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

        this.view.webContents.loadURL(getLocalURLString('serversSidebar.html'), {userAgent: composeUserAgent()}).
            catch((reason) => {
                log.error(`Servers sidebar window failed to load: ${reason}`);
                log.info(process.env);
            });

        this.setOrderedServers();

        // mainWindow.addBrowserView(this.view!);
    }

    hide = () => {
        const mainWindow = MainWindow.get();

        if (!mainWindow) {
            log.error('Main window was not available');
            return;
        }

        mainWindow.removeBrowserView(this.view!);
    }

    show = () => {
        const mainWindow = MainWindow.get();

        if (!mainWindow) {
            log.error('Main window was not available');
            return;
        }

        this?.view?.webContents.openDevTools({mode: 'detach'});
        mainWindow.addBrowserView(this.view!);
    }

    private setBounds = () => {
        if (this.view) {
            const mainWindow = MainWindow.get();

            if (!mainWindow) {
                return;
            }

            const windowBoundaries = getWindowBoundaries(mainWindow);
            this.view.setBounds({...windowBoundaries, x: 0, width: SERVERS_SIDEBAR_WIDTH});
        }
    }

    private updateTeams = (_: any, teams: ConfigServer[]) => {
        this.teams = teams.filter((t) => t.name !== DEFAULT_TEAM_NAME);
        this.updateSidebar();
    }

    private updateTeamsOrderPreference = (_: any, preference: string) => {
        this.teamsOrderPreference = preference ? preference.split(',') : this.teams.map((t) => t.teamInfo?.id);
        this.updateSidebar();
    }

    private handleUpdateTeamsOrder = (_: any, order: string[]) => {
        viewManager.sendToAllViews(TEAMS_ORDER_PREFERENCE_UPDATED, order);
    }

    private updateServers = () => {
        this.setOrderedServers();
        this.updateSidebar();
        this.registerKeyboardEvents();
    }

    private updatePreferredTheme = (_: any, theme: any) => {
        this.preferredTheme = theme;
        this.updateSidebar();
    }

    private updateUserLocale = (_: any, locale: string) => {
        this.userLocale = locale;
    }

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
        );
    }

    private updateWindowBounds = () => {
        this.setBounds();
        this.updateSidebar();
    }

    private updateMentions = (expired: Map<string, boolean>, mentions: Map<string, number>, unreads: Map<string, boolean>) => {
        log.silly('updateMentions', {expired, mentions, unreads});

        this.unreads = this.reduceNotifications(this.unreads, unreads, (base, value) => base || value || false);
        this.mentions = this.reduceNotifications(this.mentions, mentions, (base, value) => (base ?? 0) + (value ?? 0));
        this.expired = this.reduceNotifications(this.expired, expired, (base, value) => base || value || false);
        this.updateSidebar();
    }

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
    }

    private setOrderedServers = () => {
        this.servers = ServerManager.getOrderedServers().map((server) => server.toUniqueServer());
    }

    private registerKeyboardEvents = () => {
        viewManager.getCurrentView()?.registerWebContentEvent('before-input-event', (_: any, event: Electron.Event<any>) => {
            const code = String(event.code);
            if (event.alt && event.meta && code.startsWith('Digit')) {
                const codeIndex = Number(code.split('Digit').pop());
                const teamId = this.teamsOrderPreference?.[codeIndex - 1];
                const team = this.teams.find((t) => t.teamInfo?.id === teamId);
                const server = this.servers.find((s) => s.name === team?.name);

                if (!server?.id) {
                    return;
                }

                ServerViewState.switchServer(server.id);
            }
        });
    }
}

const serversSidebar = new ServerSidebar();
export default serversSidebar;
