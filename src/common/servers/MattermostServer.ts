// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {v4 as uuid} from 'uuid';

import {parseURL} from 'common/utils/url';

import type {UniqueServer, Server, ServerTeam} from 'types/config';

export class MattermostServer {
    id: string;
    name: string;
    url!: URL;
    isPredefined: boolean;
    teamInfo?: ServerTeam;
    initialLoadURL?: URL;

    constructor(server: Server, isPredefined: boolean, initialLoadURL?: URL) {
        this.id = uuid();

        this.name = server.name;
        this.teamInfo = server?.teamInfo;
        this.updateURL(server.url);

        this.isPredefined = isPredefined;
        this.initialLoadURL = initialLoadURL;
    }

    updateURL = (url: string) => {
        this.url = parseURL(url)!;
        if (!this.url) {
            throw new Error('Invalid url for creating a server');
        }
    };

    toUniqueServer = (): UniqueServer => {
        return {
            name: this.name,
            url: this.url.toString(),
            id: this.id,
            isPredefined: this.isPredefined,
            teamInfo: this.teamInfo,
        };
    };
}
