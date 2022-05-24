// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable max-lines */

// import 'renderer/css/settings.css';

import React from 'react';

import JitsiMeetExternalAPI from 'renderer/external_api';

export default class SettingsPage extends React.PureComponent<Record<string, never>> {
    currentRef: React.RefObject<HTMLDivElement>;

    constructor(props: Record<string, never>) {
        super(props);

        this.currentRef = React.createRef();

        // if (!(window as any).JitsiMeetExternalAPI) {
        //     const script = document.createElement('script');
        //     script.type = 'text/javascript';
        //     script.src = 'https://kmeet.preprod.dev.infomaniak.ch/external_api.js';
        //     document.head.appendChild(script);
        // }
    }

    componentDidMount() {
        const configOverwrite = {
            startWithAudioMuted: false,
            startWithVideoMuted: true,
            subject: 'toto',
        };

        // const options = {
        //     configOverwrite,
        //     onload: () => console.log('[jitsi] iframe loaded'),
        //     roomName: 'toto',
        // };

        const options = {
            configOverwrite,
            parentNode: this.currentRef.current,
            roomName: 'toto',
        };

        const api = new JitsiMeetExternalAPI('kmeet.preprod.dev.infomaniak.ch', {
            ...options,
        });

        window.jitsiNodeAPI.setupRenderer(api, {
            enableRemoteControl: false,
            enableAlwaysOnTopWindow: false,
        });
    }

    render() {
        return (
            <div
                style={{
                    height: '100%',
                    position: 'absolute',
                    right: 0,
                    left: 0,
                }}
                ref={this.currentRef}
            />
        );
    }
}
