// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import url from 'url';

import {app, BrowserWindow, ipcMain, shell} from 'electron';

import {
    initPopupsConfigurationMain,
    setupAlwaysOnTopMain,
    setupPowerMonitorMain,
    setupScreenSharingMain,
    getPopupTarget,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
} from '@infomaniak/jitsi-meet-electron-sdk';

import electronBuilder from '../../../electron-builder.json';

import {composeUserAgent, getLocalPreload, getLocalURLString} from '../utils';
import {Logger} from 'common/log';

import ServerViewState from 'app/serverViewState';

import ViewManager from 'main/views/viewManager';
import {CALL_ENDED, CALL_RING_CLOSE_WINDOW, CALL_RING_WINDOW_IS_OPEN} from 'common/communication';

import MainWindow from './mainWindow';
import CallDialingWindow from './callDialingWindow';

const log = new Logger('KmeetCallWindow');

/**
 * Opens the given link in an external browser.
 *
 * @param {string} link - The link (URL) that should be opened in the external browser.
 * @returns {void}
 */
export function openExternalLink(link: string) {
    let u;

    try {
        u = url.parse(link);
    } catch (e) {
        return;
    }

    const proto = u.protocol;
    const href = u.href;

    if (proto === 'http:' || proto === 'https:' || proto === 'mailto:') {
        shell.openExternal(href);
    }
}

class KmeetCallWindow {
    private callWindow?: BrowserWindow
    private callInfo?: object

    constructor() {
        ipcMain.handle('get-call-info', () => this.callInfo);
        ipcMain.on(CALL_ENDED, this.handleCallEnded);
        ipcMain.on(CALL_RING_CLOSE_WINDOW, this.handleCloseRingWindow);
        ipcMain.handle(CALL_RING_WINDOW_IS_OPEN, this.handleIsCallWindowOpen);
    }

    create(callInfo: object) {
        const mainWindow = MainWindow.get();
        const currentServer = ServerViewState!.getCurrentServer();

        if (!mainWindow || !currentServer) {
            log.error('Main window does not exist');
            return;
        }

        if (this.callWindow) {
            this.destroy();
        }

        if (CallDialingWindow.isClosable()) {
            this.closeRingWindow();
        }

        const preload = getLocalPreload('call.js');
        const session = mainWindow.webContents.session;

        this.callWindow = new BrowserWindow({
            parent: mainWindow,
            show: true,
            center: true,
            webPreferences: {
                preload,
                session,
                sandbox: false,
                enableBlinkFeatures: 'WebAssemblyCSP',
                nodeIntegration: false,
                contextIsolation: false,
            },
        });

        this.callInfo = callInfo;

        this.callWindow.setTitle('Kmeet');
        const localURL = getLocalURLString('call.html');
        this.callWindow.loadURL(localURL, {
            userAgent: composeUserAgent(),
        }).catch(
            (reason) => {
                log.error(`Call window failed to load: ${reason}`);
                log.info(process.env);
            });

        this.callWindow.webContents.on('dom-ready', () => {
            this.callWindow!.webContents.send('load-server-url', `${currentServer.url.toString()}static/kmeet.js`);
        });

        const windowOpenHandler = ({url, frameName}: {url: string; frameName: string}) => {
            const target = getPopupTarget(url, frameName);

            if (!target || target === 'browser') {
                openExternalLink(url);

                return {action: 'deny'};
            }

            if (target === 'electron') {
                return {action: 'allow'};
            }

            return {action: 'deny'};
        };

        initPopupsConfigurationMain(this.callWindow);
        setupAlwaysOnTopMain(this.callWindow, null, windowOpenHandler);
        setupPowerMonitorMain(this.callWindow);
        setupScreenSharingMain(this.callWindow, app.getName(), electronBuilder.appId);
    }

    destroy() {
        try {
            if (this.callWindow?.closable) {
                this.callWindow?.destroy();
            }
        } catch (error) {
            log.debug('Kmeet window could not be destroyed', error);
        }

        this.callInfo = {};
        this.callWindow = undefined;
    }

    private handleCallEnded = (_: any, message: any) => {
        this.destroy();
        ViewManager.sendToAllViews(CALL_ENDED, message);
    }

    private closeRingWindow = () => {
        CallDialingWindow.destroy();
    }

    private handleCloseRingWindow = () => {
        this.closeRingWindow();
    }

    private handleIsCallWindowOpen = () => {
        return CallDialingWindow.isClosable();
    }
}

const kmeetCallWindow = new KmeetCallWindow();
export default kmeetCallWindow;
