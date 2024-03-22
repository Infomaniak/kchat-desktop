// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {BrowserView, app, ipcMain} from 'electron';

import {
    DARK_MODE_CHANGE,
    EMIT_CONFIGURATION,
    MAIN_WINDOW_CREATED, MAIN_WINDOW_RESIZED,
    SERVERS_UPDATE, UPDATE_APPSTATE,
    UPDATE_SERVERS_SIDEBAR
} from 'common/communication';

import {Logger} from 'common/log';
import {getLocalPreload, getLocalURLString, getWindowBoundaries} from 'main/utils';
import MainWindow from 'main/windows/mainWindow';
import { SERVERS_SIDEBAR_WIDTH } from 'common/utils/constants';
import { UniqueServer } from 'types/config';
import ServerManager from 'common/servers/serverManager';
import Config from 'common/config';
import ServerViewState from 'app/serverViewState';
import AppState from 'common/appState';

const log = new Logger('ServersSidebar');

export class ServerSidebar {
    private view?: BrowserView;
    private servers: UniqueServer[];

    private unreads: Map<string, boolean>;
    private mentions: Map<string, number>;
    private expired: Map<string, boolean>;

    private hasGPOServers: boolean;

    private windowBounds?: Electron.Rectangle;

    constructor() {
        this.servers = [];
        this.hasGPOServers = false

        this.unreads = new Map();
        this.mentions = new Map();
        this.expired = new Map();

        MainWindow.on(MAIN_WINDOW_CREATED, this.init);
        MainWindow.on(MAIN_WINDOW_RESIZED, this.updateWindowBounds);

        ipcMain.on(EMIT_CONFIGURATION, this.updateServers);
        AppState.on(UPDATE_APPSTATE, this.updateMentions);

        ServerManager.on(SERVERS_UPDATE, this.updateServers);
    }

    init = () => {
        log.info('Init')
        const preload = getLocalPreload('internalAPI.js');

        this.view = new BrowserView({webPreferences: {
            preload,

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            transparent: true,
        }});

        this.view.webContents.loadURL(getLocalURLString('serversSidebar.html'));
        this.windowBounds = MainWindow.getBounds();

        this.setOrderedServers();

        const mainWindow = MainWindow.get()

        if (!mainWindow) {
            return
        }

        mainWindow.addBrowserView(this.view!);

        this.setBounds()
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

            console.log('mainWindow.getBrowserViews().includes(this.view!)', mainWindow.getBrowserViews().includes(this.view!))


            const windowBoundaries = getWindowBoundaries(mainWindow);
            this.view.setBounds({...windowBoundaries, x: 0, width: SERVERS_SIDEBAR_WIDTH});
        }
    }

    private updateServers = () => {
        this.setOrderedServers();
        this.updateSidebar()
    }

    private updateSidebar = () => {
        log.silly('update sidebar');

        this.view?.webContents.send(
            UPDATE_SERVERS_SIDEBAR,
            this.servers,
            Config.darkMode,
            this.windowBounds,
            ServerManager.hasServers() ? ServerViewState.getCurrentServer().id : undefined,
            Config.enableServerManagement,
            this.hasGPOServers,
            this.expired,
            this.mentions,
            this.unreads,
        );
    }

    private updateWindowBounds = (newBounds: Electron.Rectangle) => {
        this.windowBounds = newBounds;
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
        this.hasGPOServers = this.servers.some((srv) => srv.isPredefined);
    }
}

const serversSidebar = new ServerSidebar();
export default serversSidebar;