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
import { ConfigServer, UniqueServer } from 'types/config';
import { DropResult } from 'react-beautiful-dnd';
import { Theme } from 'types/theme';

type State = {
    servers?: UniqueServer[];
    teams?: ConfigServer[];
    serverOrder?: string[];
    orderedServers?: UniqueServer[];
    activeServer?: string;
    unreads?: Map<string, boolean>;
    mentions?: Map<string, number>;
    expired?: Map<string, boolean>;
    isAnyDragging?: boolean;
    windowBounds?: Electron.Rectangle;
    preferredTheme?: Theme
}

const ServersSidebarRenderer = () => {
    const [state, setState] = useState<State>()

    const handleUpdate = (
        servers: UniqueServer[],
        teams: ConfigServer[],
        activeServer?: string,
        expired?: Map<string, boolean>,
        mentions?: Map<string, number>,
        unreads?: Map<string, boolean>,
        windowBounds?: Electron.Rectangle,
        preferredTheme?: Theme
    ) => {
        setState({
            servers,
            teams,
            activeServer,
            unreads,
            mentions,
            expired,
            windowBounds,
            preferredTheme
        });
    }

    const onButtonClick = (serverName: string) => {
        window.desktop.serversSidebar.switchServer(serverName)
    }

    const onDragEnd = (result: DropResult) => {
        const removedIndex = result.source.index;
        const addedIndex = result.destination?.index;
        if (addedIndex === undefined || removedIndex === addedIndex) {
            setState({...state, isAnyDragging: false});
            return;
        }
        if (!state?.servers) {
            throw new Error('No config');
        }
        const serversCopy = state.servers.concat();

        const server = serversCopy.splice(removedIndex, 1);
        const newOrder = addedIndex < state.servers.length ? addedIndex : state.servers.length - 1;
        serversCopy.splice(newOrder, 0, server[0]);

        setState({...state, ...{servers: serversCopy, isAnyDragging: false}});
        window.desktop.updateServerOrder(serversCopy.map((server) => server.id!));
    }

    const teams = useMemo(() => state?.teams?.map(team => {
        const server = state?.servers?.find(s => s.name === team.name);

        return {
            ...team.teamInfo,
            serverId: server?.id,
            serverName: team.name,
        }
    }) || [], [state])

    const activeTeamId = useMemo(() => {
        const server = state?.servers?.find(s => s.id === state.activeServer);
        const team = state?.teams?.find(t => t.name === server?.name)
        return team?.teamInfo?.id
    }, [state?.teams, state?.servers, state?.activeServer])

    useEffect(() => {
        window.desktop.serversSidebar.onUpdateSidebar(handleUpdate);
    }, [])

    return <ServersSidebar
        teams={teams}
        activeServerId={activeTeamId}
        isDropDisabled={!!state?.servers?.length}
        isAnyDragging={!!state?.isAnyDragging}
        onButtonClick={onButtonClick}
        onDragEnd={onDragEnd}
        theme={state?.preferredTheme}
        unreads={state?.unreads}
        mentions={state?.mentions}
        expired={state?.expired}
    />
}

const start = async () => {
    ReactDOM.render(
        <IntlProvider>
            <ServersSidebarRenderer/>
        </IntlProvider>,
        document.getElementById('app'),
    )
}

start()


