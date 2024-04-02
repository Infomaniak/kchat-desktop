// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {CSSProperties} from 'react';
import {ConfigServer, ServerTeam} from 'types/config';
import {Theme} from 'types/theme';

export function imageURLForTeam(team: ServerTeam) {
    return team?.last_team_icon_update ? `${team.url}/api/v4/teams/${team.id}/image?_=${team.last_team_icon_update}` : null;
}

export function initialForTeam(team?: ServerTeam) {
    return team?.name ? team.name.replace(/\s/g, '').substring(0, 2) : '??';
}

export function toRgbValues(hexStr: string): string {
    const rgbaStr = `${parseInt(hexStr.substr(1, 2), 16)}, ${parseInt(hexStr.substr(3, 2), 16)}, ${parseInt(hexStr.substr(5, 2), 16)}`;
    return rgbaStr;
}

export const applyCssVars = (theme: Theme) => {
    return {
        '--sidebar-background': theme.sidebarHeaderBg,
        '--sidebar-border-color-rgb': toRgbValues(theme.centerChannelColor),
        '--sidebar-team-bg': theme.sidebarTeamBarBg,
        '--sidebar-text-header-color': theme.sidebarHeaderTextColor,
        '--sidebar-text-color-rgb': toRgbValues(theme.sidebarText),
        '--sidebar-header-text-color-rgb': toRgbValues(theme.sidebarText!),
        '--mention-bg': theme.mentionBg,
    } as CSSProperties;
};

export function filterAndSortTeamsByDisplayName(servers: ConfigServer[], locale: string, teamsOrder = '') {
    if (!servers) {
        return [];
    }

    const teamsOrderList = teamsOrder.split(',');

    const customSortedTeams = servers.filter((server) => {
        if (server.teamInfo !== null) {
            return teamsOrderList.includes(server.teamInfo.id);
        }
        return false;
    }).sort((a, b) => {
        return teamsOrderList.indexOf(a.teamInfo.id) - teamsOrderList.indexOf(b.teamInfo.id);
    });

    return customSortedTeams.filter((server) => {
        return server && (!server.teamInfo.delete_at as unknown as number) > 0 && server.teamInfo.display_name != null;
    });
}
