// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {extractCommonsPermissions} from './permissionMigrator';

describe('extractCommonsPermissions', () => {
    const server1 = 'server1';
    const server2 = 'server2';

    it('All server permissions are same, no commons → migrate to commons', () => {
        const input = {
            [server1]: {notifications: {allowed: true}},
            [server2]: {notifications: {allowed: true}},
        };

        const result = extractCommonsPermissions(input);

        expect(result).toEqual({
            commons: {notifications: {allowed: true}},
        });
    });

    it('All server permissions are same, commons exists and matches → keep in commons, remove from servers', () => {
        const input = {
            commons: {notifications: {allowed: true}},
            [server1]: {notifications: {allowed: true}},
            [server2]: {notifications: {allowed: true}},
        };

        const result = extractCommonsPermissions(input);

        expect(result).toEqual({
            commons: {notifications: {allowed: true}},
        });
    });

    it('All server permissions are same, commons exists but differs → remove from commons and servers', () => {
        const input = {
            commons: {notifications: {allowed: false}},
            [server1]: {notifications: {allowed: true}},
            [server2]: {notifications: {allowed: true}},
        };

        const result = extractCommonsPermissions(input);

        expect(result).toEqual(null);
    });

    it('Server permissions differ, no commons → remove from servers (drop entirely)', () => {
        const input = {
            [server1]: {notifications: {allowed: true}},
            [server2]: {notifications: {allowed: false}},
        };

        const result = extractCommonsPermissions(input);

        expect(result).toEqual(null);
    });

    it('Server permissions differ, commons exists → remove from commons and servers (conflict)', () => {
        const input = {
            commons: {notifications: {allowed: true}},
            [server1]: {notifications: {allowed: true}},
            [server2]: {notifications: {allowed: false}},
        };

        const result = extractCommonsPermissions(input);

        expect(result).toEqual(null);
    });

    it('Handles alwaysDeny properly: one has alwaysDeny, others do not → treat as conflict, drop all', () => {
        const input = {
            [server1]: {notifications: {allowed: false, alwaysDeny: true}},
            [server2]: {notifications: {allowed: false}},
        };

        const result = extractCommonsPermissions(input);

        expect(result).toEqual(null);
    });

    it('Returns null when there are no server entries', () => {
        const result = extractCommonsPermissions({commons: {notifications: {allowed: true}}});
        expect(result).toBeNull();
    });

    it('Returns null when no common permissions can be extracted', () => {
        const input = {
            [server1]: {notifications: {allowed: true}},
            [server2]: {notifications: {allowed: false}},
        };

        const result = extractCommonsPermissions(input);
        expect(result).toEqual(null);
    });

    it('Correctly migrates multiple permission types with mixed cases', () => {
        const input = {
            [server1]: {
                notifications: {allowed: true},
                media: {allowed: true},
                geolocation: {allowed: false, alwaysDeny: true},
            },
            [server2]: {
                notifications: {allowed: true},
                media: {allowed: true},
                geolocation: {allowed: false, alwaysDeny: true},
            },
        };

        const result = extractCommonsPermissions(input);

        expect(result).toEqual({
            commons: {
                notifications: {allowed: true},
                media: {allowed: true},
                geolocation: {allowed: false, alwaysDeny: true},
            },
        });
    });

    it('Migrates permission types that are identical across servers and drops those that differ', () => {
        const input = {
            [server1]: {
                notifications: {allowed: true},
                media: {allowed: true},
                geolocation: {allowed: false},
            },
            [server2]: {
                notifications: {allowed: true},
                media: {allowed: false}, // differs
                geolocation: {allowed: false},
            },
        };

        const result = extractCommonsPermissions(input);

        expect(result).toEqual({
            commons: {
                notifications: {allowed: true},
                geolocation: {allowed: false},
            },
        });
    });
});
