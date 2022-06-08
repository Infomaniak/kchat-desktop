// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable max-lines */

// import 'renderer/css/settings.css';
import React from 'react';

import {CALL_CLOSED, CALL_COMMAND} from 'common/communication';

import JitsiMeetExternalAPI from 'renderer/external_api';

export default class SettingsPage extends React.PureComponent<Record<string, never>> {
    currentRef: React.RefObject<HTMLDivElement>;

    constructor(props: Record<string, never>) {
        super(props);

        this.currentRef = React.createRef();
    }

    componentDidMount() {
        window.ipcRenderer.on('jitsi-connect', (_, msg) => this.handleConnect(msg.id, msg.url, msg.username, msg.avatar, msg.channelName));
    }

    handleConnect(id: string, url: string, username: string, avatar: string, channelName: string) {
        const configOverwrite = {
            startWithAudioMuted: false,
            startWithVideoMuted: true,
            subject: channelName !== '' ? channelName : id,
            prejoinConfig: {enabled: false},
            disableDeepLinking: true,
            feedbackPercentage: 0,
        };

        const options = {
            configOverwrite,

            // parentNode: this.currentRef.current,
            roomName: id,
            userInfo: {
                displayName: username,
            },
        };

        const api = new JitsiMeetExternalAPI('kmeet.preprod.dev.infomaniak.ch', {
            ...options,
        });

        window.jitsiNodeAPI.setupRenderer(api, {
            enableRemoteControl: false,
            enableAlwaysOnTopWindow: false,
        });
        
        setTimeout(() => {
            api.executeCommand('avatarUrl', avatar);
        }, 1000);

        api.on('readyToClose', () => {
            window.ipcRenderer.send(CALL_CLOSED, id);
            api.dispose();
        });

        api.addListener('audioMuteStatusChanged', (status) => {
            window.ipcRenderer.send('call-audio-status-change', status);
        });

        api.addListener('videoMuteStatusChanged', (status) => {
            window.ipcRenderer.send('call-video-status-change', status);
        });

        api.addListener('screenSharingStatusChanged', (status) => {
            window.ipcRenderer.send('call-ss-status-change', status);
        });

        window.ipcRenderer.on(CALL_COMMAND, (_, msg) => {
            api.executeCommand(msg.command);
        });
    }

    render() {
        return (
            <React.Fragment/>
        );
    }
}
