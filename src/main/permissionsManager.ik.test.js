// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {dialog} from 'electron';

import Config from 'common/config';
import {parseURL, isTrustedURL} from 'common/utils/url';
import ViewManager from 'main/views/viewManager';
import CallsWidgetWindow from 'main/windows/callsWidgetWindow';
import MainWindow from 'main/windows/mainWindow';

import {PermissionsManager} from './permissionsManager';

jest.mock('fs', () => ({
    readFileSync: jest.fn(),
    writeFile: jest.fn(),
}));

jest.mock('electron', () => ({
    app: {
        name: 'Mattermost',
        getPath: jest.fn(),
    },
    ipcMain: {
        on: jest.fn(),
        handle: jest.fn(),
    },
    dialog: {
        showMessageBox: jest.fn(),
    },
    systemPreferences: {
        getMediaAccessStatus: jest.fn(),
        askForMediaAccess: jest.fn(),
    },
}));

jest.mock('common/utils/url', () => ({
    parseURL: jest.fn(),
    isTrustedURL: jest.fn(),
}));

jest.mock('common/config', () => ({
    registryData: {
        servers: [],
    },
}));

jest.mock('main/i18nManager', () => ({
    localizeMessage: jest.fn(),
}));
jest.mock('main/views/viewManager', () => ({
    getViewByWebContentsId: jest.fn(),
}));
jest.mock('main/windows/callsWidgetWindow', () => ({
    isCallsWidget: jest.fn(),
    getViewURL: jest.fn(),
}));

// Ik change : enhance mainWindow and serverViewState mock
jest.mock('main/windows/mainWindow', () => ({
    get: jest.fn(),
}));
jest.mock('app/serverViewState', () => ({}));

describe('main/PermissionsManager', () => {
    const env = process.env;

    beforeEach(() => {
        process.env = {...env, NODE_ENV: 'jest'};
        MainWindow.get.mockReturnValue({webContents: {id: 2}});
        ViewManager.getViewByWebContentsId.mockImplementation((id) => {
            if (id === 2) {
                return {view: {server: {url: new URL('http://anyurl.com')}}};
            }
            if (id === 3) {
                return {view: {server: {url: new URL('http://otherurl.com')}}};
            }
            if (id === 4) {
                return {view: {server: {url: new URL('http://gposerver.com')}}};
            }

            return null;
        });
        CallsWidgetWindow.isCallsWidget.mockImplementation(() => false);
        parseURL.mockImplementation((url) => {
            try {
                return new URL(url);
            } catch {
                return null;
            }
        });
        isTrustedURL.mockImplementation((url, baseURL) => url.toString().startsWith(baseURL.toString()));
        Config.registryData.servers = [
            {
                url: 'http://gposerver.com',
            },
        ];
    });

    afterEach(() => {
        jest.resetAllMocks();
        process.env = env;
    });

    describe('Ik: use global permission (instead of server scoped ones)', () => {
        it('should show 1 popup for same perm (different server)', async () => {
            const permissionsManager = new PermissionsManager('anyfile.json');
            permissionsManager.writeToFile = jest.fn();
            const cb = jest.fn();
            dialog.showMessageBox.mockReturnValue(Promise.resolve({response: 2}));
            await Promise.all([
                permissionsManager.handlePermissionRequest({id: 2}, 'notifications', cb, {requestingUrl: 'http://anyurl.com'}),
                permissionsManager.handlePermissionRequest({id: 3}, 'notifications', cb, {requestingUrl: 'http://otherurl.com'}),
            ]);
            expect(dialog.showMessageBox).toHaveBeenCalledTimes(1);
        });

        it('should show 2 popup for different perm (same serv)', async () => {
            const permissionsManager = new PermissionsManager('anyfile.json');
            permissionsManager.writeToFile = jest.fn();
            const cb = jest.fn();
            dialog.showMessageBox.mockReturnValue(Promise.resolve({response: 2}));

            await permissionsManager.handlePermissionRequest({id: 2}, 'geolocation', cb, {requestingUrl: 'http://anyurl.com'});
            await permissionsManager.handlePermissionRequest({id: 2}, 'notifications', cb, {requestingUrl: 'http://anyurl.com'});

            expect(dialog.showMessageBox).toHaveBeenCalledTimes(2);
        });

        it('should show 2 popup for different perm (different serv)', async () => {
            const permissionsManager = new PermissionsManager('anyfile.json');
            permissionsManager.writeToFile = jest.fn();
            const cb = jest.fn();
            dialog.showMessageBox.mockReturnValue(Promise.resolve({response: 2}));

            await permissionsManager.handlePermissionRequest({id: 2}, 'geolocation', cb, {requestingUrl: 'http://anyurl.com'});
            await permissionsManager.handlePermissionRequest({id: 3}, 'screenShare', cb, {requestingUrl: 'http://otherurl.com'});

            expect(dialog.showMessageBox).toHaveBeenCalledTimes(2);
        });
    });
});
