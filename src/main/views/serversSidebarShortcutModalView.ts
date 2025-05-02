// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {BrowserView, ipcMain} from 'electron';

import {TEAM_MOUSE_IN, TEAM_MOUSE_OUT, UPDATE_SIDEBAR_MODAL} from 'common/communication';
import {Logger} from 'common/log';
import {
    SERVERS_SIDEBAR_BUTTON_HEIGHT,
    SERVERS_SIDEBAR_DEFAULT_MARGIN,
    SERVERS_SIDEBAR_PADDING_TOP,
    SERVERS_SIDEBAR_WIDTH,
    TAB_BAR_HEIGHT,
} from 'common/utils/constants';
import {getLocalPreload} from 'main/utils';

const log = new Logger('ServerSidebarShortcutModalView');

export class ServerSidebarShortcutModalView {
    private view?: BrowserView;
    private currentTeam?: { index: number; name: string };
    private timeOutId?: NodeJS.Timeout;

    constructor() {
        ipcMain.on(TEAM_MOUSE_IN, this.handleMouseIn);
        ipcMain.on(TEAM_MOUSE_OUT, this.handleMouseOut);

        // this.init();
    }

    init = (mainWindow) => {
        // const mainWindow = MainWindow.get();

        this.mainWindow = mainWindow;
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

        this.view.webContents.loadURL('kchat-desktop://renderer/serversSidebarShortcutModal.html').
            catch((reason) => {
                log.error(`Servers sidebar window failed to load: ${reason}`);
                log.info(process.env);
            });

        mainWindow.addBrowserView(this.view!);
    };

    hide = () => {
        if (!this.view) {
            return;
        }

        if (this.timeOutId) {
            clearTimeout(this.timeOutId);
        }

        this.updateModal();
        this.timeOutId = setTimeout(() => this.view!.setBounds(this.getBounds(0, 0)), 300);
    };

    show = () => {
        if (!this.view) {
            return;
        }

        if (this.timeOutId) {
            clearTimeout(this.timeOutId);
        }

        this.view.setBounds(this.getBounds(500, 60));
        this.timeOutId = setTimeout(() => this.updateModal(), 300);
        this.mainWindow.setTopBrowserView(this.view);
    };

    private handleMouseIn = (_: any, index: number, name: string) => {
        this.currentTeam = {name, index};
        this.show();
    };

    private handleMouseOut = () => {
        this.currentTeam = undefined;
        this.hide();
    };

    private getBounds = (width: number, height: number) => {
        const x = SERVERS_SIDEBAR_WIDTH;
        const y = (TAB_BAR_HEIGHT + SERVERS_SIDEBAR_PADDING_TOP) +
            (this.currentTeam?.index ? ((this.currentTeam.index - 1) * ((SERVERS_SIDEBAR_BUTTON_HEIGHT) + SERVERS_SIDEBAR_DEFAULT_MARGIN)) : 0);

        return {
            x,
            y,
            width,
            height,
        };
    };

    private updateModal = () => {
        log.silly('update servers sidebar modal');

        this.view?.webContents.send(
            UPDATE_SIDEBAR_MODAL,
            this.currentTeam,
            process.platform === 'darwin',
        );
    };
}

const serverSidebarShortcutModalView = new ServerSidebarShortcutModalView();
export default serverSidebarShortcutModalView;
