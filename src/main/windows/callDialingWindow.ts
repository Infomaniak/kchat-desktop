// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {BrowserWindow, ipcMain} from 'electron';
import log from 'electron-log';

import {CALL_CANCEL, CALL_DECLINED, CALL_DIAL_UPDATED, CALL_JOINED} from 'common/communication';
import ViewManager from 'main/views/viewManager';

import type {IkCallInfo} from 'types/callsIk';

import MainWindow from './mainWindow';

import {getLocalPreload, getLocalURLString} from '../utils';

class CallDialingWindow {
    private window?: BrowserWindow;

    constructor() {
        ipcMain.on(CALL_JOINED, this.handleCallAccepted);
        ipcMain.on(CALL_DECLINED, this.handleCallDeclined);
        ipcMain.on(CALL_CANCEL, this.handleCallCancel);
        ipcMain.on(CALL_DIAL_UPDATED, this.handleCallInfoUpdated);
    }

    create(callInfo: IkCallInfo) {
        if (this.window) {
            return this.window;
        }

        const mainWindow = MainWindow.get();
        const mainSession = mainWindow!.webContents.session;
        const preload = getLocalPreload('callDial.js');
        const localURL = getLocalURLString('callDialing.html');

        const callDialWindow = new BrowserWindow({
            width: 280,
            height: 230,
            titleBarStyle: 'hiddenInset',
            hasShadow: true,
            minimizable: false,
            maximizable: false,
            resizable: false,
            alwaysOnTop: true,
            fullscreen: false,
            fullscreenable: false,
            frame: false,
            webPreferences: {
                preload,
                session: mainSession,
            },
        });

        callDialWindow.setTitle('kChat');
        callDialWindow.setMenuBarVisibility(false);
        callDialWindow.loadURL(localURL).catch(
            (reason) => {
                log.error(`Settings window failed to load: ${reason}`);
                log.info(process.env);
            });

        callDialWindow.webContents.once('dom-ready', () => callDialWindow?.show());
        callDialWindow.webContents.on('did-finish-load', () => callDialWindow.webContents.send('info-received', callInfo));
        callDialWindow.on('close', (e) => {
            this.handleCallDeclined(e, callInfo);
        });

        const withDevTools = Boolean(process.env.MM_DEBUG_SETTINGS) || false;

        if (withDevTools) {
            callDialWindow.webContents.openDevTools({mode: 'detach'});
        }

        this.window = callDialWindow;
        return callDialWindow;
    }

    destroy() {
        if (this.window && this.window.isClosable()) {
            this.window.destroy();
            this.window = undefined;
        }
    }

    isClosable() {
        return Boolean(this.window?.isClosable());
    }

    private handleCallInfoUpdated = (_: any, callInfo: IkCallInfo) => {
        ViewManager.sendToAllViews(CALL_DIAL_UPDATED, callInfo);
    };

    private handleCallDeclined = (_: any, callInfo: IkCallInfo) => {
        this.destroy();
        ViewManager.sendToAllViews(CALL_DECLINED, callInfo);
    };

    private handleCallAccepted = (_: any, callInfo: IkCallInfo) => {
        this.destroy();
        ViewManager.sendToAllViews(CALL_JOINED, callInfo);
    };

    private handleCallCancel = (_: any, callInfo: IkCallInfo) => {
        this.destroy();
        ViewManager.sendToAllViews(CALL_CANCEL, callInfo);
    };
}

const callDialingWindow = new CallDialingWindow();
export default callDialingWindow;
