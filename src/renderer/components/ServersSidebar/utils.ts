import { ServerTeam } from "types/server";

export function imageURLForTeam(team?: ServerTeam) {
    return team?.last_team_icon_update ? `${team.url}/api/v4/teams/${team.id}/image`: null;
}

export function initialForTeam(team?: ServerTeam) {
    return team?.name ? team.name.replace(/\s/g, '').substring(0, 2) : '??'
}
