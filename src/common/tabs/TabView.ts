// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Tab, Team} from 'types/config';

import {MattermostServer} from 'common/servers/MattermostServer';

import MessagingTabView from './MessagingTabView';
import FocalboardTabView from './FocalboardTabView';
import PlaybooksTabView from './PlaybooksTabView';
import LoginTabView from './LoginTabView';
import MeetTabView from './MeetTabView';

export const TAB_MESSAGING = 'TAB_MESSAGING';
export const TAB_FOCALBOARD = 'TAB_FOCALBOARD';
export const TAB_PLAYBOOKS = 'TAB_PLAYBOOKS';
export const TAB_LOGIN = 'TAB_LOGIN';
export const TAB_MEET = 'TAB_MEET';

export type TabType = typeof TAB_MESSAGING | typeof TAB_FOCALBOARD | typeof TAB_PLAYBOOKS | typeof TAB_LOGIN | typeof TAB_MEET;

export interface TabView {
    server: MattermostServer;

    get name(): string;
    get type(): TabType;
    get url(): URL;
    get shouldNotify(): boolean;
}

export function getDefaultTeamWithTabsFromTeam(team: Team) {
    return {
        ...team,
        tabs: [
            {
                name: TAB_MESSAGING,
                order: 0,
                isOpen: true,
            },
            {
                name: TAB_FOCALBOARD,
                order: 1,
            },
            {
                name: TAB_PLAYBOOKS,
                order: 2,
            },
            {
                name: TAB_LOGIN,
                order: 3,
            },
            {
                name: TAB_MEET,
                order: 4,
            },
        ],
    };
}

export function getServerView(srv: MattermostServer, tab: Tab) {
    switch (tab.name) {
    case TAB_MESSAGING:
        return new MessagingTabView(srv);
    case TAB_FOCALBOARD:
        return new FocalboardTabView(srv);
    case TAB_PLAYBOOKS:
        return new PlaybooksTabView(srv);
    case TAB_LOGIN:
        return new LoginTabView(srv);
    case TAB_MEET:
        return new MeetTabView(srv);
    default:
        throw new Error('Not implemeneted');
    }
}

export function getTabViewName(serverName: string, tabType: string) {
    return `${serverName}___${tabType}`;
}

export function getTabDisplayName(tabType: TabType) {
    switch (tabType) {
    case TAB_MESSAGING:
        return 'Channels';
    case TAB_FOCALBOARD:
        return 'Boards';
    case TAB_PLAYBOOKS:
        return 'Playbooks';
    case TAB_LOGIN:
        return 'Login';
    case TAB_MEET:
        return 'kMeet';
    default:
        throw new Error('Not implemeneted');
    }
}

export function canCloseTab(tabType: TabType) {
    return tabType !== TAB_MESSAGING;
}
