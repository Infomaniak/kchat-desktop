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

import {composeUserAgent, getLocalPreload, getLocalURLString} from '../utils';

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

export function createKmeetCallWindow(mainWindow: BrowserWindow, serverUrl: string, callInfo: object) {
    const preload = getLocalPreload('call.js');
    const session = mainWindow.webContents.session;

    const kmeetCallWindow = new BrowserWindow({
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

    const localURL = getLocalURLString('call.html');
    kmeetCallWindow.loadURL(localURL, {
        userAgent: composeUserAgent(),
    }).catch(
        (reason) => {
            // log.error(`Call window failed to load: ${reason}`);
            // log.info(process.env);
        });

    kmeetCallWindow.webContents.on('dom-ready', () => {
        kmeetCallWindow.webContents.send('load-server-url', serverUrl);
    });

    kmeetCallWindow.webContents.openDevTools({mode: 'detach'});

    ipcMain.handle('get-call-info', () => callInfo);

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

    initPopupsConfigurationMain(kmeetCallWindow);
    setupAlwaysOnTopMain(kmeetCallWindow, null, windowOpenHandler);
    setupPowerMonitorMain(kmeetCallWindow);
    setupScreenSharingMain(kmeetCallWindow, app.getName(), 'com.infomaniak.chat');

    return kmeetCallWindow;
}
