// Copyright (c) 2015-2016 Yuya Ochiai
// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
'use strict';

import type {MenuItem, MenuItemConstructorOptions} from 'electron';
import {Menu, app} from 'electron';

import ServerViewState from 'app/serverViewState';
import ServerManager from 'common/servers/serverManager';
import {localizeMessage} from 'main/i18nManager';
import {getLocalPreload, getLocalURLString} from 'main/utils';
import ModalManager from 'main/views/modalManager';
import MainWindow from 'main/windows/mainWindow';

export function createTemplate() {
    const appName = app.name;
    const servers = ServerManager.getOrderedServers();
    const template = [
        ...servers.slice(0, 9).map((server) => {
            return {
                label: server.name.length > 50 ? `${server.name.slice(0, 50)}...` : server.name,
                click: () => {
                    ServerViewState.switchServer(server.id);
                },
            };
        }), {
            type: 'separator',
        }, {
            label: process.platform === 'darwin' ? localizeMessage('main.menus.tray.preferences', 'Preferences...') : localizeMessage('main.menus.tray.settings', 'Settings'),
            click: () => {
                const mainWindow = MainWindow.get();
                if (!mainWindow) {
                    return;
                }

                ModalManager.addModal(
                    'settingsModal',
                    getLocalURLString('settings.html'),
                    getLocalPreload('internalAPI.js'),
                    null,
                    mainWindow,
                );
            },
        }, {
            type: 'separator',
        }, {
            role: 'quit',
            label: localizeMessage('main.menus.tray.quit', 'Quit', {appName}),
        },
    ];
    return template;
}

export function createMenu() {
    // Electron is enforcing certain variables that it doesn't need
    return Menu.buildFromTemplate(createTemplate() as Array<MenuItemConstructorOptions | MenuItem>);
}
