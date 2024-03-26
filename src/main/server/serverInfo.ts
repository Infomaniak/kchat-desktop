// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ClientConfig, RemoteInfo, ServerTeam} from 'types/server';

import {MattermostServer} from 'common/servers/MattermostServer';
import {parseURL} from 'common/utils/url';

import {getServerAPI} from './serverAPI';

export class ServerInfo {
    private server: MattermostServer;
    private remoteInfo: RemoteInfo;

    constructor(server: MattermostServer) {
        this.server = server;
        this.remoteInfo = {};
    }

    fetchConfigData = async () => {
        await this.getRemoteInfo<ClientConfig>(
            this.onGetConfig,
            parseURL(`${this.server.url}/api/v4/config/client?format=old`),
        );

        return this.remoteInfo;
    }

    fetchTeamInfo = async () => {
        await this.getRemoteInfo<ServerTeam[]>(
            this.onGetServerInfo,
            parseURL(`${this.server.url}/api/v4/teams`),
        );

        return this.remoteInfo;
    }

    fetchUserPreferences = async () => {
        await this.getRemoteInfo<ServerTeam[]>(
            this.onGetUserPreferences,
            parseURL(`${this.server.url}/api/v4/users/me/preferences`),
        );

        return this.remoteInfo;
    }


    fetchRemoteInfo = async () => {
        await this.fetchConfigData();
        await this.fetchTeamInfo();
        // await this.fetchUserPreferences();

        await this.getRemoteInfo<Array<{id: string; version: string}>>(
            this.onGetPlugins,
            parseURL(`${this.server.url}/api/v4/plugins/webapp`),
        );

        return this.remoteInfo;
    }

    private getRemoteInfo = <T>(
        callback: (data: T) => void,
        url?: URL,
    ) => {
        if (!url) {
            return Promise.reject(new Error('Malformed URL'));
        }
        return new Promise<void>((resolve, reject) => {
            getServerAPI<T>(
                url,
                false,
                (data: T) => {
                    callback(data);
                    resolve();
                },
                () => reject(new Error('Aborted')),
                (error: Error) => reject(error));
        });
    }

    private onGetServerInfo = (data: ServerTeam[]) => {
        const matchedTeam = data.find(team => team.url === this.remoteInfo.siteURL)

        if (!matchedTeam) {
            throw new Error('No team is available for your current server')
        }

        this.remoteInfo.team = matchedTeam
    }

    private onGetUserPreferences = (data: any[]) => {
        console.log('onGetUserPreferences DATA', data)
    }

    private onGetConfig = (data: ClientConfig) => {
        this.remoteInfo.serverVersion = data.Version;
        this.remoteInfo.siteURL = data.SiteURL;
        this.remoteInfo.siteName = data.SiteName;
        this.remoteInfo.hasFocalboard = this.remoteInfo.hasFocalboard || data.BuildBoards === 'true';
    }

    private onGetPlugins = (data: Array<{id: string; version: string}>) => {
        this.remoteInfo.hasFocalboard = this.remoteInfo.hasFocalboard || data.some((plugin) => plugin.id === 'focalboard');
        this.remoteInfo.hasPlaybooks = data.some((plugin) => plugin.id === 'playbooks');
    }
}
