// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {BrowserView, app, ipcMain} from 'electron';

import {DARK_MODE_CHANGE, EMIT_CONFIGURATION, LOADING_SCREEN_ANIMATION_FINISHED, MAIN_WINDOW_RESIZED, SERVERS_UPDATE, TOGGLE_LOADING_SCREEN_VISIBILITY} from 'common/communication';
import {Logger} from 'common/log';

import {getLocalPreload, getLocalURLString, getWindowBoundaries} from 'main/utils';
import MainWindow from 'main/windows/mainWindow';
import { SERVERS_SIDEBAR_WIDTH } from 'common/utils/constants';
import { UniqueServer } from 'types/config';
import ServerManager from 'common/servers/serverManager';

const log = new Logger('LoadingScreen');

export class ServerSidebar {
    private view?: BrowserView;
    private servers: UniqueServer[];

    private unreads: Map<string, boolean>;
    private mentions: Map<string, number>;
    private expired: Map<string, boolean>;

    private windowBounds?: Electron.Rectangle;

    constructor() {
        this.servers = [];

        this.unreads = new Map();
        this.mentions = new Map();
        this.expired = new Map();

        // MainWindow.on(MAIN_WINDOW_CREATED, this.init);
        MainWindow.on(MAIN_WINDOW_RESIZED, this.updateWindowBounds);


        ipcMain.on(EMIT_CONFIGURATION, this.updateServers);

        // AppState.on(UPDATE_APPSTATE, this.updateMentions);
        ServerManager.on(SERVERS_UPDATE, this.updateServers);
    }

    private updateWindowBounds = (newBounds: Electron.Rectangle) => {
        this.windowBounds = newBounds;
    }

    /**
     * Loading Screen
     */

    setDarkMode = (darkMode: boolean) => {
        this.view?.webContents.send(DARK_MODE_CHANGE, darkMode);
    }


    show = () => {
        const mainWindow = MainWindow.get();

        if (!mainWindow) {
            return;
        }

        if (!this.view) {
            this.create();
        }


        if (this.view?.webContents.isLoading()) {
            this.view.webContents.once('did-finish-load', () => {
                this.view!.webContents.send(TOGGLE_LOADING_SCREEN_VISIBILITY, true);
            });
        } else {
            this.view!.webContents.send(TOGGLE_LOADING_SCREEN_VISIBILITY, true);
        }

        if (mainWindow.getBrowserViews().includes(this.view!)) {
            mainWindow.setTopBrowserView(this.view!);
        } else {
            mainWindow.addBrowserView(this.view!);
        }

        this.setBounds();
    }

    private create = () => {
        console.log('CREATING SERVER SIDEBAR')
        const preload = getLocalPreload('internalAPI.js');
        this.view = new BrowserView({webPreferences: {
            preload,

            // Workaround for this issue: https://github.com/electron/electron/issues/30993
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            transparent: true,
        }});
        const localURL = getLocalURLString('serversSidebar.html');
        console.log('SERVER SIDEBAR LOCAL URL', localURL)
        this.view.webContents.loadURL(localURL);
    }

    private setBounds = () => {
        if (this.view) {
            const mainWindow = MainWindow.get();
            if (!mainWindow) {
                return;
            }
            const windowBoundaries = getWindowBoundaries(mainWindow)
            this.view.setBounds({...windowBoundaries, x: 0, width: SERVERS_SIDEBAR_WIDTH});
        }
    }


    private updateServers = () => {
        this.setOrderedServers();
    }

    private setOrderedServers = () => {
        this.servers = ServerManager.getOrderedServers().map((server) => server.toUniqueServer());
        this.hasGPOServers = this.servers.some((srv) => srv.isPredefined);
    }
}

const serversSidebar = new ServerSidebar();
export default serversSidebar;
