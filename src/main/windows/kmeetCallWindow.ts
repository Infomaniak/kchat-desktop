// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {app, BrowserWindow} from 'electron';

import {
    initPopupsConfigurationMain,
    RemoteControlMain,
    setupAlwaysOnTopMain,
    setupPowerMonitorMain,
    setupScreenSharingMain,

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
} from '@infomaniak/jitsi-meet-electron-sdk';

import {getLocalPreload} from '../utils';
import config from 'common/config';

export function createKmeetCallWindow(mainWindow: BrowserWindow) {
    const preload = getLocalPreload('kmeetCall.js');
    const session = mainWindow.webContents.session;

    const kmeetCallWindow = new BrowserWindow({
        parent: mainWindow,
        show: false,
        center: true,
        webPreferences: {
            preload,
            session,
            sandbox: false,
            enableBlinkFeatures: 'WebAssemblyCSP',
            nodeIntegration: false,
        },
    });

    kmeetCallWindow.webContents.openDevTools({mode: 'detach'});

    initPopupsConfigurationMain(kmeetCallWindow);
    setupAlwaysOnTopMain(kmeetCallWindow, null, () => console.log('null'));
    setupPowerMonitorMain(kmeetCallWindow);
    setupScreenSharingMain(kmeetCallWindow, config, app.getVersion());

    // eslint-disable-next-line no-new
    new RemoteControlMain(kmeetCallWindow);

    return kmeetCallWindow;
}
