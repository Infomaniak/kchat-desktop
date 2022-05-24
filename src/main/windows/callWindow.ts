// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {BrowserWindow} from 'electron';
import log from 'electron-log';

import Config from 'common/config';

import ContextMenu from '../contextMenu';
import {getLocalPreload, getLocalURLString} from '../utils';

export function createCallWindow(mainWindow: BrowserWindow, withDevTools: boolean) {
    const preload = getLocalPreload('call.js');
    const spellcheck = (typeof Config.useSpellChecker === 'undefined' ? true : Config.useSpellChecker);
    const callWindow = new BrowserWindow({
        parent: mainWindow,
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

    if (withDevTools) {
        callWindow.webContents.openDevTools({mode: 'detach'});
    }
    return callWindow;
}
