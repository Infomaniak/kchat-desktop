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

import JitsiApi from '../../common/utils/external_api';

const whitelistedIpcChannels = ['protocol-data-msg', 'renderer-ready'];

/**
 * Setup the renderer process.
 *
 * @param {*} api - API object.
 * @param {*} options - Options for what to enable.
 * @returns {void}
 */
function setupRenderer(options = {}) {
    console.log('options', options);
    const api = new JitsiApi('kmeet.preprod.dev.infomaniak.ch', options);

    initPopupsConfigurationRender(api);

    const iframe = api.getIFrame();

    setupScreenSharingRender(api);

    new RemoteControl(iframe); // eslint-disable-line no-new

    // Allow window to be on top if enabled in settings
    setupAlwaysOnTopRender(api, null, {showOnPrejoin: true});

    setupPowerMonitorRender(api);
}

// contextBridge.exposeInMainWorld('jitsiNodeAPI', {
//     setupRenderer,
//     ipc: {
//         on: (channel, listener) => {
//             if (!whitelistedIpcChannels.includes(channel)) {
//                 return;
//             }

//             ipcRenderer.on(channel, listener);
//         },
//         send: (channel) => {
//             if (!whitelistedIpcChannels.includes(channel)) {
//                 return;
//             }

//             ipcRenderer.send(channel);
//         },
//         removeListener: (channel, listener) => {
//             if (!whitelistedIpcChannels.includes(channel)) {
//                 return;
//             }

//             ipcRenderer.removeListener(channel, listener);
//         },
//     },
// });

window.jitsiNodeAPI = {
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

