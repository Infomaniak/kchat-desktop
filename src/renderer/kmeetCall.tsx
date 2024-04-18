// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import 'bootstrap/dist/css/bootstrap.min.css';

// import 'renderer/css/index.css';
// import 'renderer/css/settings.css';
import 'renderer/css/call-dialing.css';

import React, {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';

const Component = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const options = {
            width: '100%',
            height: '100%',
            parentNode: ref.current ?? undefined,
            roomName: '23821029802492',
            interfaceConfigOverwrite: {
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                VIDEO_LAYOUT_FIT: 'height',
            },
            userInfo: {
                displayName: 'Philippe',
                email: 'philippe.karle@infomaniak.com',
            },
            configOverwrite: {
                defaultLanguage: 'fr',
                prejoinPageEnabled: true,
            },
        };

        // const api = new JitsiApi('kmeet.preprod.dev.infomaniak.ch', options) as JitsiMeetExternalAPI;

        // console.log('api', api);

        window.jitsiNodeAPI!.setupRenderer(options);
    });

    return (
        <div
            style={{height: '100vh'}}
            ref={ref}
        />
    );
};

const start = async () => {
    ReactDOM.render(
        <Component/>,
        document.getElementById('app'),
    );
};

// Deny drag&drop navigation in mainWindow.
document.addEventListener('dragover', (event) => event.preventDefault());
document.addEventListener('drop', (event) => event.preventDefault());

start();
