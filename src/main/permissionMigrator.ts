// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {supportedPermissionTypes, type PermissionType} from 'types/permissions';

type StrictPermissions = Partial<Record<PermissionType, {
    allowed: boolean;
    alwaysDeny?: boolean;
}>>;

type PermissionsMap = Record<string, StrictPermissions>;

function permissionsMatch(
    p1: { allowed: boolean; alwaysDeny?: boolean },
    p2: { allowed: boolean; alwaysDeny?: boolean },
): boolean {
    return p1.allowed === p2.allowed && p1.alwaysDeny === p2.alwaysDeny;
}

function allServersHaveSamePermission(
    perms: Array<{ allowed: boolean; alwaysDeny?: boolean } | undefined>,
): boolean {
    const definedPerms = perms.filter((p) => p !== undefined);

    if (definedPerms.length === 0) {
        return false;
    }

    const first = definedPerms[0]!;
    return definedPerms.every((p) => permissionsMatch(p!, first));
}

export function extractCommonsPermissions(initialPermissions: PermissionsMap): PermissionsMap | null {
    const hasCommons = 'commons' in initialPermissions;
    const serverEntries = Object.entries(initialPermissions).filter(([key]) => key !== 'commons');

    if (serverEntries.length === 0) {
        return null;
    }

    if (hasCommons) {
        return {
            commons: {...(initialPermissions.commons ?? {})},
        };
    }

    const commons: StrictPermissions = {};

    for (const type of supportedPermissionTypes) {
        const serverPermsForType = serverEntries.map(([, perms]) => perms[type]);

        if (allServersHaveSamePermission(serverPermsForType)) {
            const firstPerm = serverPermsForType.find((p) => p !== undefined);
            if (firstPerm) {
                commons[type] = {...firstPerm};
            }
        }
    }

    return {commons};
}
