// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {BrowserView, ipcMain} from 'electron';

import {TEAM_MOUSE_IN, TEAM_MOUSE_OUT, UPDATE_SIDEBAR_MODAL} from 'common/communication';

import {Logger} from 'common/log';
import {composeUserAgent, getLocalPreload, getLocalURLString} from 'main/utils';
import MainWindow from 'main/windows/mainWindow';
import {SERVERS_SIDEBAR_WIDTH} from 'common/utils/constants';

const log = new Logger('ServerSidebarShortcutModalView');

export class ServerSidebarShortcutModalView {
    private view?: BrowserView;
    private userLocale: string
    private currentTeam?: { index: number; name: string }
    private windowBounds?: Electron.Rectangle;
    private timeOutId?: NodeJS.Timeout

    constructor() {
        this.userLocale = '';
        this.windowBounds = MainWindow.getBounds();

        // MainWindow.on(MAIN_WINDOW_RESIZED, this.updateWindowBounds);

        // ipcMain.on(USER_LOCALE, this.updateUserLocale);
        ipcMain.on(TEAM_MOUSE_IN, this.handleMouseIn);
        ipcMain.on(TEAM_MOUSE_OUT, this.handleMouseOut);

        this.init();
    }

    init = () => {
        const mainWindow = MainWindow.get();

        if (!mainWindow) {
            log.error('Main window was not available');
            return;
        }

        log.info('Init');

        const preload = getLocalPreload('internalAPI.js');

        this.view = new BrowserView({
            webPreferences: {
                preload,
                session: mainWindow.webContents.session,

                // Workaround for this issue: https://github.com/electron/electron/issues/30993
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                transparent: true,
            },
        });

        this.view.webContents.loadURL(getLocalURLString('serversSidebarShortcutModal.html'), {userAgent: composeUserAgent()}).
            catch((reason) => {
                log.error(`Servers sidebar window failed to load: ${reason}`);
                log.info(process.env);
            });

        mainWindow.addBrowserView(this.view!);
    }

    hide = () => {
        if (!this.view) {
            return;
        }

        if (this.timeOutId) {
            clearTimeout(this.timeOutId);
        }

        this.updateModal();
        this.timeOutId = setTimeout(() => this.view!.setBounds(this.getBounds(0, 0)), 300);
    }

    show = () => {
        if (!this.view) {
            return;
        }

        if (this.timeOutId) {
            clearTimeout(this.timeOutId);
        }

        this.view.webContents.openDevTools({mode: 'detach'});
        this.view.setBounds(this.getBounds(300, 300));
        this.timeOutId = setTimeout(() => this.updateModal(), 300);
        MainWindow.get()?.setTopBrowserView(this.view);
    }

    private handleMouseIn = (_: any, index: number, name: string) => {
        this.currentTeam = {name, index};
        this.show();
    }

    private handleMouseOut = () => {
        this.currentTeam = undefined;
        this.hide();
    }

    private getBounds = (width: number, height: number) => {
        const x = SERVERS_SIDEBAR_WIDTH;
        const y = this.currentTeam ? this.currentTeam.index * 52 : 0;

        return {
            x,
            y,
            width,
            height,
        };
    }

    private updateModal = () => {
        log.silly('update servers sidebar modal');

        this.view?.webContents.send(
            UPDATE_SIDEBAR_MODAL,
            this.currentTeam,
        );
    }
}

const serverSidebarShortcutModalView = new ServerSidebarShortcutModalView();
export default serverSidebarShortcutModalView;
