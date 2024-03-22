// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'renderer/css/index.css';
// import 'renderer/css/settings.css';
import 'renderer/css/call-dialing.css';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import IntlProvider from './intl_provider';
import ServersSidebar from './components/ServersSidebar';
import { UniqueServer } from 'types/config';

type State = {
    servers?: UniqueServer[];
    serverOrder?: string[];
    orderedServers?: UniqueServer[];
    activeServer?: string;
    darkMode?: boolean;
    enableServerManagement?: boolean;
    unreads?: Map<string, boolean>;
    mentions?: Map<string, number>;
    expired?: Map<string, boolean>;
    hasGPOServers?: boolean;
    isAnyDragging?: boolean;
    windowBounds?: Electron.Rectangle;
}

const ServersSidebarRenderer = () => {
    const [state, setState] = useState<State>()

    const handleUpdate = (
        servers: UniqueServer[],
        darkMode: boolean,
        windowBounds: Electron.Rectangle,
        activeServer?: string,
        enableServerManagement?: boolean,
        hasGPOServers?: boolean,
        expired?: Map<string, boolean>,
        mentions?: Map<string, number>,
        unreads?: Map<string, boolean>,
    ) => {
        setState({
            servers,
            activeServer,
            darkMode,
            enableServerManagement,
            hasGPOServers,
            unreads,
            mentions,
            expired,
            windowBounds,
        });
    }

    useEffect(() => {
        window.desktop.serversSidebar.onUpdateSidebar(handleUpdate);
    }, [])

    return <ServersSidebar {...state} />
}

document.addEventListener('dragover', (event) => event.preventDefault());
document.addEventListener('drop', (event) => event.preventDefault());

const start = async () => {
    ReactDOM.render(
        <IntlProvider>
            <ServersSidebarRenderer/>
        </IntlProvider>,
        document.getElementById('app'),
    )
}

start()


