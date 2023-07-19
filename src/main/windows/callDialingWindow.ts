// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {BrowserWindow, ipcMain} from 'electron';
import log from 'electron-log';

import Config from 'common/config';

import {getLocalPreload, getLocalURLString} from '../utils';
import {CALL_CLOSED, CALL_COMMAND} from 'common/communication';

export function createCallDialingWindow(mainWindow: BrowserWindow, withDevTools: boolean, callInfo) {
    const preload = getLocalPreload('callDial.js');
    const spellcheck = (typeof Config.useSpellChecker === 'undefined' ? true : Config.useSpellChecker);
    const callDialWindow = new BrowserWindow({
        width: 267,
        height: 267,

        // parent: mainWindow,
     
        titleBarStyle: 'hiddenInset',
        hasShadow: true,
        minimizable: false,
        maximizable: false,
        resizable: false,
        alwaysOnTop: true,
        fullscreen: false,
        fullscreenable: false,

        // skipTaskbar: true,
        // frame: false,
        webPreferences: {
            preload,
            partition: 'persist:main',
            nodeIntegration: true,
            contextIsolation: false},
    });
    callDialWindow.setTitle('kChat');

    // const contextMenu = new ContextMenu({}, callDialWindow);
    // contextMenu.reload();

    const localURL = getLocalURLString('callDialing.html');
    callDialWindow.setMenuBarVisibility(false);
    callDialWindow.loadURL(localURL).catch(
        (reason) => {
            log.error(`Settings window failed to load: ${reason}`);
            log.info(process.env);
        });
    callDialWindow.show();

    callDialWindow.webContents.on('did-finish-load', () => {
        callDialWindow.webContents.send('info-received', callInfo);
    });

    if (withDevTools) {
        callDialWindow.webContents.openDevTools({mode: 'detach'});
    }
    return callDialWindow;
}
