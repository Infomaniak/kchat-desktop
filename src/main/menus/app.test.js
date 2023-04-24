// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

'use strict';

import {getDoNotDisturb as getDarwinDoNotDisturb} from 'macos-notification-state';

import {localizeMessage} from 'main/i18nManager';

import {createTemplate} from './app';

jest.mock('electron', () => {
    class NotificationMock {
        static isSupported = jest.fn();
        static didConstruct = jest.fn();
        constructor() {
            NotificationMock.didConstruct();
        }
        on = jest.fn();
        show = jest.fn();
        click = jest.fn();
        close = jest.fn();
    }
    return {
        app: {
            name: 'AppName',
            getVersion: () => '5.0.0',
            getAppPath: () => '',
        },
        ipcMain: {
            emit: jest.fn(),
            handle: jest.fn(),
            on: jest.fn(),
            removeHandler: jest.fn(),
            removeListener: jest.fn(),
        },
        Notification: NotificationMock,
    };
});
jest.mock('fs', () => ({
    existsSync: jest.fn().mockReturnValue(false),
    readFileSync: jest.fn().mockImplementation((text) => text),
    writeFile: jest.fn(),
}));
jest.mock('macos-notification-state', () => ({
    getDoNotDisturb: jest.fn(),
}));
jest.mock('main/i18nManager', () => ({
    localizeMessage: jest.fn(),
}));
jest.mock('main/windows/windowManager', () => ({
    getCurrentTeamName: jest.fn(),
    sendToRenderer: jest.fn(),
}));
jest.mock('common/tabs/TabView', () => ({
    getTabDisplayName: (name) => name,
    getDefaultTeamWithTabsFromTeam: (value) => ({
        ...value,
        tabs: [
            {
                name: 'tab1',
            },
            {
                name: 'tab2',
            },
        ],
    }),
}));

describe('main/menus/app', () => {
    const config = {
        data: {
            enableServerManagement: true,
            teams: [{
                name: 'example',
                url: 'http://example.com',
                order: 0,
                tabs: [
                    {
                        name: 'TAB_MESSAGING',
                        order: 0,
                        isOpen: true,
                    },
                    {
                        name: 'TAB_FOCALBOARD',
                        order: 1,
                        isOpen: true,
                    },
                    {
                        name: 'TAB_PLAYBOOKS',
                        order: 2,
                        isOpen: true,
                    },
                ],
                lastActiveTab: 0,
            }, {
                name: 'github',
                url: 'https://github.com/',
                order: 1,
                tabs: [
                    {
                        name: 'TAB_MESSAGING',
                        order: 0,
                        isOpen: true,
                    },
                    {
                        name: 'TAB_FOCALBOARD',
                        order: 1,
                        isOpen: true,
                    },
                    {
                        name: 'TAB_PLAYBOOKS',
                        order: 2,
                        isOpen: true,
                    },
                ],
                lastActiveTab: 0,
            }],
            helpLink: 'http://link-to-help.site.com',
        },
    };
    beforeEach(() => {
        getDarwinDoNotDisturb.mockReturnValue(false);
    });

    describe('mac only', () => {
        let originalPlatform;
        beforeAll(() => {
            originalPlatform = process.platform;
            Object.defineProperty(process, 'platform', {
                value: 'darwin',
            });
        });

        afterAll(() => {
            Object.defineProperty(process, 'platform', {
                value: originalPlatform,
            });
        });

        it('should have first menu name as AppName', () => {
            const menu = createTemplate(config);
            const appNameMenu = menu.find((item) => item.label === '&AppName');
            expect(appNameMenu).not.toBe(undefined);
        });

        it('should include About <appname> in menu on mac', () => {
            localizeMessage.mockImplementation((id) => {
                if (id === 'main.menus.app.file.about') {
                    return 'About AppName';
                }
                return id;
            });
            const menu = createTemplate(config);
            const appNameMenu = menu.find((item) => item.label === '&AppName');
            const menuItem = appNameMenu.submenu.find((item) => item.label === 'About AppName');
            expect(menuItem).not.toBe(undefined);
            expect(menuItem.role).toBe('about');
        });

        it('should contain hide options', () => {
            localizeMessage.mockImplementation((id) => {
                if (id === 'main.menus.app.file') {
                    return '&AppName';
                }
                return id;
            });
            const menu = createTemplate(config);
            const appNameMenu = menu.find((item) => item.label === '&AppName');
            expect(appNameMenu.submenu).toContainEqual(expect.objectContaining({role: 'hide'}));
            expect(appNameMenu.submenu).toContainEqual(expect.objectContaining({role: 'unhide'}));
            expect(appNameMenu.submenu).toContainEqual(expect.objectContaining({role: 'hideOthers'}));
        });

        it('should contain zoom and front options in Window', () => {
            localizeMessage.mockImplementation((id) => {
                if (id === 'main.menus.app.window') {
                    return '&Window';
                }
                return id;
            });
            const menu = createTemplate(config);
            const windowMenu = menu.find((item) => item.label === '&Window');
            expect(windowMenu.role).toBe('windowMenu');
            expect(windowMenu.submenu).toContainEqual(expect.objectContaining({role: 'zoom'}));

            // expect(windowMenu.submenu).toContainEqual(expect.objectContaining({role: 'front'}));
        });
    });

    it('should show the "Run diagnostics" item under help', () => {
        const menu = createTemplate(config);
        const helpSubmenu = menu.find((subMenu) => subMenu.id === 'help')?.submenu;
        expect(helpSubmenu).toContainObject({id: 'diagnostics'});
    });
});
