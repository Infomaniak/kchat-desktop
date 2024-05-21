// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// Copyright (c) 2015-2016

'use strict';

import {
    setupScreenSharingRender,
    setupAlwaysOnTopRender,

    // RemoteControl,
    initPopupsConfigurationRender,
    setupPowerMonitorRender,
} from '@infomaniak/jitsi-meet-electron-sdk';
import {ipcRenderer} from 'electron';
import type {
    JitsiMeetExternalAPIConstructor,
    ExternalAPIEventCallbacks,
    JitsiMeetExternalAPI as _JitsiMeetExternalAPI,
    ExternalAPIOptions as _ExternalAPIOptions,
    Config as _Config,
} from 'jitsi-meet';

import {CALL_ENDED, CALL_READY_TO_CLOSE} from 'common/communication';
import {KMEET_ORIGIN} from 'common/utils/constants';
import JitsiMeetExternalAPI from 'common/utils/external_api';

interface Config extends _Config {

    // Jitsi's types are missing these fields
    prejoinConfig?: {
        enabled: boolean;
        hideDisplayName?: boolean;
        hideExtraJoinButtons?: string[];
    };
    toolbarButtons?: string[];
    conferenceInfo?: {
        alwaysVIsible?: string[];
        autoHide?: string[];
    };
    disableSelfViewSettings?: boolean;
    localSubject: string;
}

type CallInfo = {
    channelID: string;
    locale: string;
    user: {
        first_name: string;
    };
    jwt: string;
    avatar: string;
}

interface ExternalAPIOptions extends _ExternalAPIOptions {
    configOverwrite?: Config;

    // Jitsi's types are missing these fields
    lang?: string;
    sandbox?: string;
}

let api: _JitsiMeetExternalAPI | undefined;

/**
 * Setup the renderer process.
 *
 * @param {*} api - API object.
 * @param {*} options - Options for what to enable.
 * @returns {void}
 */
function setupRenderer(parentNode: Element, callInfo: CallInfo) {
    console.log('callInfo', callInfo);
    const options: ExternalAPIOptions = {
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
            localSubject: callInfo.name,
            disableInviteFunctions: true,
            disableAGC: true,
        },
        jwt: callInfo.jwt,
    };

    api = new (JitsiMeetExternalAPI as JitsiMeetExternalAPIConstructor)(KMEET_ORIGIN, options);

    initPopupsConfigurationRender(api);
    setupScreenSharingRender(api);
    setupAlwaysOnTopRender(api);
    setupPowerMonitorRender(api);

    api.executeCommand('avatarUrl', callInfo.avatar);

    api.on('videoConferenceLeft', () => ipcRenderer.send(CALL_ENDED, callInfo));
    api.on('errorOccurred', onErrorOccurred);

    api.on('readyToClose', () => {
        console.log('call ready to close from prejoin');
        ipcRenderer.send(CALL_READY_TO_CLOSE);
    });

    return api;
}

const onErrorOccurred = ({error}: Parameters<ExternalAPIEventCallbacks['errorOccurred']>[0]): void => {
    if (error.isFatal) {
        console.log(error);

        ipcRenderer.send(CALL_READY_TO_CLOSE);
    }
};

window.jitsiNodeAPI = {
    setupRenderer,
    getCallInfo: () => ipcRenderer.invoke('get-call-info'),
    onLoadServerUrl: (listener) => ipcRenderer.on('load-server-url', (_, url) => listener(url)),
};
