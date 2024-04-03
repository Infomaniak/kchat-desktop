// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import 'bootstrap/dist/css/bootstrap.min.css';

// import 'renderer/css/index.css';
// import 'renderer/css/settings.css';
import 'renderer/css/call-dialing.css';

import React, {useEffect, useMemo, useState} from 'react';
import ReactDOM from 'react-dom';

import {ConfigServer, UniqueServer} from 'types/config';
import {DropResult} from 'react-beautiful-dnd';
import {Theme} from 'types/theme';
import * as Sentry from '@sentry/electron/renderer';

import ServersSidebar from './components/ServersSidebar';
import IntlProvider from './intl_provider';
import {filterAndSortTeamsByDisplayName} from './components/ServersSidebar/utils';

Sentry.init({
    dsn: 'https://bafc5cd5580a437a9bfd407e8d5f69bf@sentry-kchat.infomaniak.com/5',
});

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
    preferredTheme?: Theme;
    teamsOrderPreference?: string[];
    isReadyToSwitchServer?: boolean;
}

const ServersSidebarRenderer = () => {
    const [state, setState] = useState<State>();

    const handleUpdate = (
        servers: UniqueServer[],
        teams: ConfigServer[],
        activeServer?: string,
        expired?: Map<string, boolean>,
        mentions?: Map<string, number>,
        unreads?: Map<string, boolean>,
        windowBounds?: Electron.Rectangle,
        preferredTheme?: Theme,
        teamsOrderPreference?: string[],
        isReadyToSwitchServer?: boolean,
    ) => {
        setState({
            servers,
            teams,
            activeServer,
            unreads,
            mentions,
            expired,
            windowBounds,
            preferredTheme,
            teamsOrderPreference,
            isReadyToSwitchServer,
        });
    };

    const onButtonClick = (serverName: string) => {
        window.desktop.serversSidebar.switchServer(serverName);
    };

    const onDragEnd = (result: DropResult) => {
        const removedIndex = result.source.index;
        const addedIndex = result.destination?.index;

        if (addedIndex === undefined || removedIndex === addedIndex) {
            setState({...state, isAnyDragging: false});
            return;
        }

        if (!state?.teams) {
            throw new Error('No config');
        }

        const teamsCopy = filterAndSortTeamsByDisplayName(state.teams.concat(), '', state.teamsOrderPreference);
        const server = teamsCopy.splice(removedIndex, 1);
        const newOrder = addedIndex < state.teams.length ? addedIndex : state.teams.length - 1;
        teamsCopy.splice(newOrder, 0, server[0]);
        const newTeamsOrder = teamsCopy.map((team) => team.teamInfo.id!);

        setState({...state, ...{teams: teamsCopy, isAnyDragging: false, teamsOrderPreference: newTeamsOrder}});
        window.desktop.serversSidebar.updateTeamsOrder(newTeamsOrder);
    };

    const teams = useMemo(() => {
        if (!state?.teams) {
            return [];
        }

        const orderedTeams = filterAndSortTeamsByDisplayName(state.teams, '', state.teamsOrderPreference);

        return orderedTeams.map((team) => {
            const server = state?.servers?.find((s) => s.name === team.name);

            return {
                ...team.teamInfo,
                serverId: server?.id,
                serverName: team.name,
            };
        });
    }, [state]);

    const activeTeamId = useMemo(() => {
        const server = state?.servers?.find((s) => s.id === state.activeServer);
        const team = state?.teams?.find((t) => t.name === server?.name);
        return team?.teamInfo?.id;
    }, [state?.teams, state?.servers, state?.activeServer]);

    const isMultiServer = useMemo(() => teams && teams.length > 1, [teams]);

    useEffect(() => {
        window.desktop.serversSidebar.onUpdateSidebar(handleUpdate);
    }, []);

    return (
        <ServersSidebar
            teams={teams}
            activeServerId={activeTeamId}
            isDropDisabled={!isMultiServer}
            isAnyDragging={Boolean(state?.isAnyDragging)}
            onButtonClick={onButtonClick}
            onDragEnd={onDragEnd}
            theme={state?.preferredTheme}
            unreads={state?.unreads}
            mentions={state?.mentions}
            expired={state?.expired}
            showButtonsIndex={Boolean(state?.isReadyToSwitchServer)}
        />
    );
};

const start = async () => {
    ReactDOM.render(
        <IntlProvider>
            <ServersSidebarRenderer/>
        </IntlProvider>,
        document.getElementById('app'),
    );
};

start();
