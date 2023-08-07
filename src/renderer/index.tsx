// Copyright (c) 2015-2016 Yuya Ochiai
// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import 'bootstrap/dist/css/bootstrap.min.css';
import 'renderer/css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import {CombinedConfig, Team} from 'types/config';

import * as Sentry from '@sentry/electron/renderer';

import MainPage from './components/MainPage';
import IntlProvider from './intl_provider';

Sentry.init({
    dsn: 'https://bafc5cd5580a437a9bfd407e8d5f69bf@sentry-kchat.infomaniak.com/5',
});

// Initialize looger to collect/centralize logs from all processes main/renderer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Object.assign(console, (window as any).logManager);

type State = {
    config?: CombinedConfig;
}

class Root extends React.PureComponent<Record<string, never>, State> {
    constructor(props: Record<string, never>) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        await this.setInitialConfig();

        window.desktop.onSynchronizeConfig(() => {
            this.reloadConfig();
        });

        window.desktop.onReloadConfiguration(() => {
            this.reloadConfig();
        });

        // Deny drag&drop navigation in mainWindow.
        // Drag&drop is allowed in webview of index.html.
        document.addEventListener('dragover', (event) => event.preventDefault());
        document.addEventListener('drop', (event) => event.preventDefault());
    }

    setInitialConfig = async () => {
        const config = await this.requestConfig(true);
        this.setState({config});
    }

    moveTabs = (teamName: string, originalOrder: number, newOrder: number): number | undefined => {
        if (!this.state.config) {
            throw new Error('No config');
        }
        const teams = this.state.config.teams.concat();
        const currentTeamIndex = teams.findIndex((team) => team.name === teamName);
        const tabs = teams[currentTeamIndex].tabs.concat();

        const tabOrder = tabs.map((team, index) => {
            return {
                index,
                order: team.order,
            };
        }).sort((a, b) => (a.order - b.order));

        const team = tabOrder.splice(originalOrder, 1);
        tabOrder.splice(newOrder, 0, team[0]);

        let teamIndex: number | undefined;
        tabOrder.forEach((t, order) => {
            if (order === newOrder) {
                teamIndex = t.index;
            }
            tabs[t.index].order = order;
        });
        teams[currentTeamIndex].tabs = tabs;
        this.setState({
            config: {
                ...this.state.config,
                teams,
            },
        });
        this.teamConfigChange(teams);
        return teamIndex;
    };

    teamConfigChange = async (updatedTeams: Team[]) => {
        window.desktop.updateTeams(updatedTeams).then(() => {
            this.reloadConfig();
        });
    };

    reloadConfig = async () => {
        const config = await this.requestConfig();
        this.setState({config});
    };

    requestConfig = async (exitOnError?: boolean) => {
        // todo: should we block?
        try {
            const configRequest = await window.desktop.getConfiguration() as CombinedConfig;
            return configRequest;
        } catch (err: any) {
            console.log(`there was an error with the config: ${err}`);
            if (exitOnError) {
                window.desktop.quit(`unable to load configuration: ${err}`, err.stack);
            }
        }
        return undefined;
    };

    openMenu = () => {
        if (window.process.platform !== 'darwin') {
            window.desktop.openAppMenu();
        }
    }

    render() {
        const {config} = this.state;
        if (!config) {
            console.log('[DEBUG] config is not loaded');
            return null;
        }
        return (
            <IntlProvider>
                <MainPage
                    teams={config.teams}
                    lastActiveTeam={config.lastActiveTeam}
                    moveTabs={this.moveTabs}
                    openMenu={this.openMenu}
                    darkMode={config.darkMode}
                    appName={config.appName}
                    useNativeWindow={config.useNativeWindow}
                />
            </IntlProvider>
        );
    }
}
window.desktop.getVersion().then(({name, version}) => {
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(`Starting ${name} v${version}${__HASH_VERSION__ ? ` commit: ${__HASH_VERSION__}` : ''}`);
});

ReactDOM.render(
    <Root/>,
    document.getElementById('app'),
);
