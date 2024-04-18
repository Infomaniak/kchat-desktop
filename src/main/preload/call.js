// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// Copyright (c) 2015-2016

'use strict';

import {
    setupScreenSharingRender,
    setupAlwaysOnTopRender,

    // RemoteControl,
    // initPopupsConfigurationRender,
    setupPowerMonitorRender,
} from '@infomaniak/jitsi-meet-electron-sdk';

import {ipcRenderer} from 'electron';

import JitsiMeetExternalAPI from 'common/utils/external_api';

/**
 * Setup the renderer process.
 *
 * @param {*} api - API object.
 * @param {*} options - Options for what to enable.
 * @returns {void}
 */
function setupRenderer(parentNode) {
    const api = new JitsiMeetExternalAPI('kmeet.preprod.dev.infomaniak.ch', {
        width: '100%',
        height: '100%',
        roomName: 'test',
        parentNode,
        sandbox: 'allow-scripts allow-same-origin allow-popups allow-forms',
        userInfo: {
            displayName: 'test',
        },
        configOverwrite: {

            // defaultLanguage: this.props.locale,

            prejoinPageEnabled: true,
        },
    });
    console.log(api);

    setupScreenSharingRender(api);
    setupAlwaysOnTopRender(api);
    setupPowerMonitorRender(api);

    return api;
}

window.jitsiNodeAPI = {
    setupRenderer,
    onLoadServerUrl: (listener) => ipcRenderer.on('load-server-url', (_, url) => listener(url)),
};
