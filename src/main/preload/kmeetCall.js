// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// Copyright (c) 2015-2016

'use strict';

import {ipcRenderer} from 'electron';

import {
    RemoteControl,
    setupScreenSharingRender,
    setupAlwaysOnTopRender,
    initPopupsConfigurationRender,
    setupPowerMonitorRender,
} from '@infomaniak/jitsi-meet-electron-sdk';

const whitelistedIpcChannels = ['protocol-data-msg', 'renderer-ready'];

/**
 * Open an external URL.
 *
 * @param {string} url - The URL we with to open.
 * @returns {void}
 */
function openExternalLink(url) {
    ipcRenderer.send('jitsi-open-url', url);
}

/**
 * Setup the renderer process.
 *
 * @param {*} api - API object.
 * @param {*} options - Options for what to enable.
 * @returns {void}
 */
function setupRenderer(api, options = {}) {
    initPopupsConfigurationRender(api);

    const iframe = api.getIFrame();

    setupScreenSharingRender(api);

    if (options.enableRemoteControl) {
        new RemoteControl(iframe); // eslint-disable-line no-new
    }

    // Allow window to be on top if enabled in settings
    if (options.enableAlwaysOnTopWindow) {
        setupAlwaysOnTopRender(api, null, {showOnPrejoin: true});
    }

    setupPowerMonitorRender(api);
}

window.jitsiNodeAPI = {
    openExternalLink,
    setupRenderer,
    ipc: {
        on: (channel, listener) => {
            if (!whitelistedIpcChannels.includes(channel)) {
                return;
            }

            ipcRenderer.on(channel, listener);
        },
        send: (channel) => {
            if (!whitelistedIpcChannels.includes(channel)) {
                return;
            }

            ipcRenderer.send(channel);
        },
        removeListener: (channel, listener) => {
            if (!whitelistedIpcChannels.includes(channel)) {
                return;
            }

            ipcRenderer.removeListener(channel, listener);
        },
    },

};

