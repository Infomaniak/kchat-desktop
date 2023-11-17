// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { BrowserWindow, ipcMain } from 'electron';
import log from 'electron-log';

import { getLocalPreload, getLocalURLString } from '../utils';
import { CALLS_JOINED_CALL } from 'common/communication';

export function createCallDialingWindow(mainWindow: BrowserWindow, withDevTools: boolean, callInfo: any) {
    const preload = getLocalPreload('callDial.js');
    const mainSession = mainWindow.webContents.session;

    //const spellcheck = (typeof Config.useSpellChecker === 'undefined' ? true : Config.useSpellChecker);
    const callDialWindow = new BrowserWindow({
        width: 267,
        height: 267,
        titleBarStyle: 'hiddenInset',
        hasShadow: true,
        minimizable: false,
        maximizable: false,
        resizable: false,
        alwaysOnTop: true,
        fullscreen: false,
        fullscreenable: false,
        frame:false,
        webPreferences: {
            preload,
            session: mainSession,
            nodeIntegration: true,
            contextIsolation: false
        },
    });
    callDialWindow.setTitle('kChat');

    const localURL = getLocalURLString('callDialing.html');
    callDialWindow.setMenuBarVisibility(false);
    callDialWindow.loadURL(localURL).catch(
        (reason) => {
            log.error(`Settings window failed to load: ${reason}`);
            log.info(process.env);
        });

    callDialWindow.webContents.once('dom-ready', () => {
        callDialWindow?.show();
    });
    ipcMain.on(CALLS_JOINED_CALL, () => {
        callDialWindow?.close();
    });
    callDialWindow.webContents.on('did-finish-load', () => {
        callDialWindow.webContents.send('info-received', callInfo);
    });

    if (withDevTools) {
        callDialWindow.webContents.openDevTools({ mode: 'detach' });
    }
    return callDialWindow;
}
