// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'renderer/css/index.css';
// import 'renderer/css/settings.css';
import 'renderer/css/call-dialing.css';

import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

import IntlProvider from './intl_provider';
import ServersSidebar from './components/ServersSidebar';
import { UniqueServer } from 'types/config';
import { DropResult } from 'react-beautiful-dnd';

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
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
    const [buttonsRefs, setButtonsRefs] = useState<Map<any, any>>(new Map())

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

    const onButtonClick = (serverId: string) => {
        window.desktop.serversSidebar.switchServer(serverId)
    }

    const onDragEnd = (result: DropResult) => {
        console.log('END DRAGGING')
        const removedIndex = result.source.index;
        const addedIndex = result.destination?.index;
        if (addedIndex === undefined || removedIndex === addedIndex) {
            setState({isAnyDragging: false});
            return;
        }
        if (!state?.servers) {
            throw new Error('No config');
        }
        const serversCopy = state.servers.concat();

        const server = serversCopy.splice(removedIndex, 1);
        const newOrder = addedIndex < state.servers.length ? addedIndex : state.servers.length - 1;
        serversCopy.splice(newOrder, 0, server[0]);

        setState({servers: serversCopy, isAnyDragging: false});
        window.desktop.updateServerOrder(serversCopy.map((server) => server.id!));
    }

    const addButtonRef = (serverIndex: number, ref: HTMLButtonElement | null) => {
        if (ref) {
            buttonsRefs.set(serverIndex, ref);
            ref.addEventListener('focusin', () => {
                setFocusedIndex(serverIndex)
            });
            ref.addEventListener('blur', () => {
                setFocusedIndex(null)
            });
        }
    }


    const setButtonRef = (serverIndex: number, refMethod?: (element: HTMLButtonElement) => unknown) => {
        return (ref: HTMLButtonElement) => {
            addButtonRef(serverIndex, ref);
            refMethod?.(ref);
        };
    }

    const orderedServers = useMemo(() => state?.servers?.map(server => ({
            name: server.name,
            id: server.id || '',
            url: server.url,
            isPredefined: !!server.isPredefined,
            team: server.remoteInfo?.team
        })) || [],
    [state])

    useEffect(() => {
        window.desktop.serversSidebar.onUpdateSidebar(handleUpdate);
    }, [])

    return <ServersSidebar
        servers={orderedServers}
        activeServerId={state?.activeServer}
        isDropDisabled={!!state?.hasGPOServers}
        isAnyDragging={!!state?.isAnyDragging}
        onButtonClick={onButtonClick}
        onDragEnd={onDragEnd}
    />
}

// document.addEventListener('dragover', (event) => event.preventDefault());
// document.addEventListener('drop', (event) => event.preventDefault());

const start = async () => {
    ReactDOM.render(
        <IntlProvider>
            <ServersSidebarRenderer/>
        </IntlProvider>,
        document.getElementById('app'),
    )
}

start()


