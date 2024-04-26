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
import {KMEET_ORIGIN} from 'common/utils/constants';
import {CALL_ENDED} from 'common/communication';

/**
 * Setup the renderer process.
 *
 * @param {*} api - API object.
 * @param {*} options - Options for what to enable.
 * @returns {void}
 */
function setupRenderer(parentNode, callInfo) {
    console.log('CALL INFO', callInfo);
    const api = new JitsiMeetExternalAPI(KMEET_ORIGIN, {
        width: '100%',
        height: '100%',
        roomName: callInfo?.channelID,
        parentNode,
        sandbox: 'allow-scripts allow-same-origin allow-popups allow-forms',
        userInfo: {
            displayName: callInfo?.user?.first_name,
        },
        configOverwrite: {
            defaultLanguage: callInfo?.locale || 'en',
            startWithVideoMuted: true,
            prejoinPageEnabled: false,
        },
        jwt: callInfo.jwt,
    });

    setupScreenSharingRender(api);
    setupAlwaysOnTopRender(api);
    setupPowerMonitorRender(api);

    api.executeCommand('avatarUrl', callInfo.avatar);

    api.addListener('videoConferenceLeft', () => ipcRenderer.send(CALL_ENDED, callInfo));

    return api;
}

window.jitsiNodeAPI = {
    setupRenderer,
    getCallInfo: () => ipcRenderer.invoke('get-call-info'),
    onLoadServerUrl: (listener) => ipcRenderer.on('load-server-url', (_, url) => listener(url)),
};
