// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {BrowserWindow, ipcMain} from 'electron';
import log from 'electron-log';

import Config from 'common/config';

import ContextMenu from '../contextMenu';
import {getLocalPreload, getLocalURLString} from '../utils';
import {CALL_CLOSED, CALL_COMMAND} from 'common/communication';

export function createCallWindow(mainWindow: BrowserWindow, withDevTools: boolean, id: string, url: string) {
    const preload = getLocalPreload('call.js');
    const spellcheck = (typeof Config.useSpellChecker === 'undefined' ? true : Config.useSpellChecker);
    const callWindow = new BrowserWindow({
        width: 1100,
        height: 800,
        // parent: mainWindow,
        title: 'Call 🔉',
        fullscreen: false,
        webPreferences: {
            nativeWindowOpen: true,
            preload,
            spellcheck,
            contextIsolation: false,
            enableBlinkFeatures: 'RTCInsertableStreams,WebAssemblySimd',
            enableRemoteModule: true,
            partition: 'persist:main',
            nodeIntegration: true,
        }});

    const contextMenu = new ContextMenu({}, callWindow);
    contextMenu.reload();

    const localURL = getLocalURLString('call.html');
    callWindow.setMenuBarVisibility(false);
    callWindow.loadURL(localURL).catch(
        (reason) => {
            log.error(`Settings window failed to load: ${reason}`);
            log.info(process.env);
        });
    callWindow.show();
    callWindow.webContents.on('did-finish-load', () => {
        callWindow.webContents.send('jitsi-connect', {id, url});
    });

    ipcMain.on(CALL_COMMAND, (_, message: {command: string}) => {
        callWindow.webContents.send('call-command', {command: message.command});
    });

    ipcMain.on('call-audio-status-change', (_, message: {muted: boolean}) => {
        mainWindow.webContents.send('call-audio-status-change', message.muted);
    });

    ipcMain.on('call-video-status-change', (_, message: {muted: boolean}) => {
        mainWindow.webContents.send('call-video-status-change', message.muted);
    });

    ipcMain.on('call-ss-status-change', (_, message: {on: boolean}) => {
        mainWindow.webContents.send('call-ss-status-change', message.on);
    });

    callWindow.on('close', () => {
        mainWindow.webContents.send(CALL_CLOSED, id);
    });

    if (withDevTools) {
        callWindow.webContents.openDevTools({mode: 'detach'});
    }
    return callWindow;
}
