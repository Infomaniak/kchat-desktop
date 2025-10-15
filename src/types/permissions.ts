// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import type {UniqueServer} from './config';

export type Permissions = {
    [permission: string]: {
        allowed: boolean;
        alwaysDeny?: boolean;
    };
};

export type UniqueServerWithPermissions = {server: UniqueServer; permissions: Permissions};

// supported permission types
export const supportedPermissionTypes = [
    'media',
    'geolocation',
    'notifications',
    'fullscreen',
    'openExternal',
    'clipboard-sanitized-write',
    'screenShare',
] as const;

export type PermissionType = typeof supportedPermissionTypes[number];
