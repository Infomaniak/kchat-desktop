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
): perms is Array<{ allowed: boolean; alwaysDeny?: boolean }> {
    if (perms.some((p) => p === undefined)) {
        return false;
    }
    const first = perms[0]!;
    return perms.every((p) => permissionsMatch(p!, first));
}

function removeConflictingPermission(type: PermissionType, commons: StrictPermissions) {
    if (type in commons) {
        delete commons[type];
    }
}

export function extractCommonsPermissions(initialPermissions: PermissionsMap): PermissionsMap | null {
    const existingCommons: StrictPermissions = 'commons' in initialPermissions ? {...(initialPermissions.commons ?? {})} : {};

    const commons: StrictPermissions = {...existingCommons};

    const serverEntries = Object.entries(initialPermissions).filter(([key]) => key !== 'commons');

    // nothing to migrate
    if (serverEntries.length === 0) {
        return null;
    }

    for (const type of supportedPermissionTypes) {
        const serverPermsForType = serverEntries.map(([, perms]) => perms[type]);

        if (!allServersHaveSamePermission(serverPermsForType)) {
            removeConflictingPermission(type, commons);
            continue;
        }

        const firstPerm = serverPermsForType[0]!;
        const commonsPerm = commons[type];

        if (commonsPerm) {
            if (!permissionsMatch(commonsPerm, firstPerm)) {
                removeConflictingPermission(type, commons);
            }
            continue;
        }

        commons[type] = {...firstPerm};
    }

    // if no commons was created then exit
    if (Object.keys(commons).length === 0) {
        return null;
    }

    return {commons};
}
