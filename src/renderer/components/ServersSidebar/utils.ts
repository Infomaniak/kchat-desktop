import { CSSProperties } from "react";
import { Server, ServerTeam } from "types/config";
import { Theme } from "types/theme";

export function imageURLForTeam(team: ServerTeam) {
    return team?.last_team_icon_update ? `${team.url}/api/v4/teams/${team.id}/image?_=${team.last_team_icon_update}`: null;
}

export function initialForTeam(team?: ServerTeam) {
    return team?.name ? team.name.replace(/\s/g, '').substring(0, 2) : '??'
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
        '--mention-bg': theme.mentionBg,
    } as CSSProperties
}

export function filterAndSortTeamsByDisplayName(teams: ServerTeam[], locale: string, teamsOrder = '') {
    if (!teams) {
        return [];
    }

    const teamsOrderList = teamsOrder.split(',');

    const customSortedTeams = teams.filter((team) => {
        if (team !== null) {
            return teamsOrderList.includes(team.id);
        }
        return false;
    }).sort((a, b) => {
        return teamsOrderList.indexOf(a.id) - teamsOrderList.indexOf(b.id);
    });

    return customSortedTeams.filter((team) => {
        return team && (!team.delete_at as unknown as number) > 0 && team.display_name != null;
    });
}
