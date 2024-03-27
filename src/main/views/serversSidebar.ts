// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {BrowserView, ipcMain} from 'electron';

import {
    DARK_MODE_CHANGE,
    EMIT_CONFIGURATION,
    MAIN_WINDOW_RESIZED,
    PREFERRED_THEME,
    SERVERS_UPDATE, SWITCH_SERVER, UPDATE_APPSTATE,
    UPDATE_SERVERS_SIDEBAR,
    UPDATE_TEAMS
} from 'common/communication';

import {Logger} from 'common/log';
import {composeUserAgent, getLocalPreload, getLocalURLString, getWindowBoundaries} from 'main/utils';
import MainWindow from 'main/windows/mainWindow';
import { SERVERS_SIDEBAR_WIDTH } from 'common/utils/constants';
import { ConfigServer, UniqueServer } from 'types/config';
import ServerManager from 'common/servers/serverManager';
import Config from 'common/config';
import ServerViewState from 'app/serverViewState';
import AppState from 'common/appState';
import { RemoteInfo } from 'types/server';
import { Theme } from 'types/theme';

const log = new Logger('ServersSidebar');

export class ServerSidebar {
    private view?: BrowserView;
    private servers: UniqueServer[];
    private preferredTheme: Theme

    private unreads: Map<string, boolean>;
    private mentions: Map<string, number>;
    private expired: Map<string, boolean>;

    private hasGPOServers: boolean;

    private windowBounds?: Electron.Rectangle;

    constructor() {
        this.servers = [];
        this.hasGPOServers = false
        this.preferredTheme = {} as Theme

        this.unreads = new Map();
        this.mentions = new Map();
        this.expired = new Map();

        MainWindow.on(MAIN_WINDOW_RESIZED, this.updateWindowBounds);

        ipcMain.on(EMIT_CONFIGURATION, this.updateServers);
        ipcMain.on(PREFERRED_THEME, this.updatePreferredTheme)
        AppState.on(UPDATE_APPSTATE, this.updateMentions);

        ServerManager.on(SERVERS_UPDATE, this.updateServers);
        ServerManager.on(UPDATE_TEAMS, this.updateServers);
        ServerManager.on(SWITCH_SERVER, this.updateServers);
    }

    init = () => {
        const mainWindow = MainWindow.get()

        if (!mainWindow) {
            log.error('Main window was not available')
            return
        }

        log.info('Init')

        const preload = getLocalPreload('internalAPI.js');
        this.windowBounds = MainWindow.getBounds();

        this.view = new BrowserView({
            webPreferences: {
                preload,
                session: mainWindow.webContents.session
            }
        });

        this.setBounds()
        this.view.webContents.loadURL(getLocalURLString('serversSidebar.html'), { userAgent: composeUserAgent() })
            .catch((reason) => {
                    log.error(`Servers sidebar window failed to load: ${reason}`);
                    log.info(process.env);
                });

        this.setOrderedServers();

        mainWindow.addBrowserView(this.view!);
        this.view.webContents.openDevTools({ mode: 'detach' })
    }

    setDarkMode = (darkMode: boolean) => {
        this.view?.webContents.send(DARK_MODE_CHANGE, darkMode);
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

    private updateServers = (_: any, servers: ConfigServer[]) => {
        console.log('servers', servers)
        this.setOrderedServers();
        this.updateSidebar()
    }

    private updatePreferredTheme = (_: any, theme: any) => {
        this.preferredTheme = theme
        this.updateSidebar()
    }

    private updateSidebar = () => {
        log.silly('update sidebar');

        this.view?.webContents.send(
            UPDATE_SERVERS_SIDEBAR,
            this.servers,
            ServerManager.hasServers() ? ServerViewState.getCurrentServer().id : undefined,
            this.expired,
            this.mentions,
            this.unreads,
            this.windowBounds,
            this.preferredTheme
        );
    }

    private updateWindowBounds = (newBounds: Electron.Rectangle) => {
        this.setBounds()
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
        this.servers =  ServerManager.getOrderedServers().map((server) => {
            const remoteInfo = ServerManager.getRemoteInfo(server.id)
            return {...server.toUniqueServer(), remoteInfo}
        });

        this.hasGPOServers = this.servers.some((srv) => srv.isPredefined);
    }
}

const serversSidebar = new ServerSidebar();
export default serversSidebar;
