// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// Copyright (c) 2015-2016 Yuya Ochiai
/* eslint-disable consistent-return */

'use strict';

// eslint-disable-next-line import/no-commonjs
const {ipcRenderer} = require('electron');
// eslint-disable-next-line import/no-commonjs
const {setupScreenSharingRender} = require('@antonbuks/jitsi-electron-sdk');

const whitelistedIpcChannels = [
    'protocol-data-msg',
    'protocol-data-homepage',
    'protocol-data-create-meeting',
    'protocol-data-join-meeting',
    'protocol-data-plan-meeting',
    'renderer-ready',
];

/**
 * Setup the renderer process.
 *
 * @param {*} api - API object.
 * @param {*} options - Options for what to enable.
 * @returns {void}
 */
function setupRenderer(api, options = {}) {
    // initPopupsConfigurationRender(api);

    const iframe = api.getIFrame();

    setupScreenSharingRender(api);

    // if (options.enableRemoteControl) {
    //     new RemoteControl(iframe); // eslint-disable-line no-new
    // }

    // // Allow window to be on top if enabled in settings
    // if (options.enableAlwaysOnTopWindow) {
    //     setupAlwaysOnTopRender(api);
    // }

    // // Disable WiFiStats on mac due to jitsi-meet-electron#585
    // if (platform !== 'darwin') {
    //     setupWiFiStats(iframe);
    // }

    // setupPowerMonitorRender(api);
}

window.ipcRenderer = {
    send: ipcRenderer.send,
    on: (channel, listener) => ipcRenderer.on(channel, (_, ...args) => listener(null, ...args)),
    invoke: ipcRenderer.invoke,
};

window.jitsiNodeAPI = {
    setupRenderer,
    ipc: {
        on: (channel, listener) => {
            if (!whitelistedIpcChannels.includes(channel)) {
                return;
            }

            return ipcRenderer.on(channel, listener);
        },
        send: (channel) => {
            if (!whitelistedIpcChannels.includes(channel)) {
                return;
            }

            return ipcRenderer.send(channel);
        },
        removeListener: (channel, listener) => {
            if (!whitelistedIpcChannels.includes(channel)) {
                return;
            }

            return ipcRenderer.removeListener(channel, listener);
        },
    },
};

// console.log(desktopCapturer.getSources)

