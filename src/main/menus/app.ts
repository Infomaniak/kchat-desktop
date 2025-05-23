// Copyright (c) 2015-2016 Yuya Ochiai
// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
'use strict';

import type {MenuItemConstructorOptions, MenuItem, WebContents} from 'electron';
import {app, Menu, session, shell, clipboard} from 'electron';

import type {Config} from 'common/config';
import ServerManager from 'common/servers/serverManager';
import {t} from 'common/utils/util';
import type {UpdateManager} from 'main/autoUpdater';
import Diagnostics from 'main/diagnostics';
import downloadsManager from 'main/downloadsManager';
import {localizeMessage} from 'main/i18nManager';
import TokenManager from 'main/tokenManager';
import {getLogsPath, getLocalPreload, getLocalURLString} from 'main/utils';
import ModalManager from 'main/views/modalManager';
import serversSidebar from 'main/views/serversSidebar';
import {ServerSidebarShortcutModalView} from 'main/views/serversSidebarShortcutModalView';
import ViewManager from 'main/views/viewManager';
import MainWindow from 'main/windows/mainWindow';

// import CallsWidgetWindow from 'main/windows/callsWidgetWindow';
// import log from 'electron-log';
// import ServerViewState from 'app/serverViewState';
// import {OPEN_SERVERS_DROPDOWN, SHOW_NEW_SERVER_MODAL} from 'common/communication';
// import {getViewDisplayName} from 'common/views/View';
// import type {ViewType} from 'common/views/View';

export function createTemplate(config: Config, updateManager: UpdateManager) {
    const separatorItem: MenuItemConstructorOptions = {
        type: 'separator',
    };

    const isMac = process.platform === 'darwin';
    const appName = app.name;
    const firstMenuName = isMac ? '&' + appName : localizeMessage('main.menus.app.file', '&File');
    const template = [];

    const settingsLabel = isMac ? localizeMessage('main.menus.app.file.preferences', 'Preferences...') : localizeMessage('main.menus.app.file.settings', 'Settings...');

    let platformAppMenu = [];
    if (isMac) {
        platformAppMenu.push(
            {
                label: localizeMessage('main.menus.app.file.about', 'About {appName}', {appName}),
                role: 'about',
            },
        );
        platformAppMenu.push(separatorItem);
    }
    platformAppMenu.push({
        label: settingsLabel,
        accelerator: 'CmdOrCtrl+,',
        click() {
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
    });

    /*if (config.enableServerManagement === true && ServerManager.hasServers()) {
        platformAppMenu.push({
            label: localizeMessage('main.menus.app.file.signInToAnotherServer', 'Sign in to Another Server'),
            click() {
                ipcMain.emit(SHOW_NEW_SERVER_MODAL);
            },
        });
    }*/

    if (isMac) {
        platformAppMenu = platformAppMenu.concat([
            separatorItem, {
                role: 'hide',
                label: localizeMessage('main.menus.app.file.hide', 'Hide {appName}', {appName}),
            }, {
                role: 'hideOthers',
                label: localizeMessage('main.menus.app.file.hideOthers', 'Hide Others'),
            }, {
                role: 'unhide',
                label: localizeMessage('main.menus.app.file.unhide', 'Show All'),
            }, separatorItem, {
                role: 'quit',
                label: localizeMessage('main.menus.app.file.quit', 'Quit {appName}', {appName}),
            }]);
    } else {
        platformAppMenu = platformAppMenu.concat([
            separatorItem, {
                role: 'quit',
                label: localizeMessage('main.menus.app.file.exit', 'Exit'),
                accelerator: 'CmdOrCtrl+Q',
            }]);
    }

    template.push({
        id: 'file',
        label: firstMenuName,
        submenu: [
            ...platformAppMenu,
        ],
    });
    template.push({
        id: 'edit',
        label: localizeMessage('main.menus.app.edit', '&Edit'),
        submenu: [{
            role: 'undo',
            label: localizeMessage('main.menus.app.edit.undo', 'Undo'),
            accelerator: 'CmdOrCtrl+Z',
        }, {
            role: 'Redo',
            label: localizeMessage('main.menus.app.edit.redo', 'Redo'),
            accelerator: 'CmdOrCtrl+SHIFT+Z',
        }, separatorItem, {
            role: 'cut',
            label: localizeMessage('main.menus.app.edit.cut', 'Cut'),
            accelerator: 'CmdOrCtrl+X',
        }, {
            role: 'copy',
            label: localizeMessage('main.menus.app.edit.copy', 'Copy'),
            accelerator: 'CmdOrCtrl+C',
        }, {
            role: 'paste',
            label: localizeMessage('main.menus.app.edit.paste', 'Paste'),
            accelerator: 'CmdOrCtrl+V',
        }, {
            role: 'pasteAndMatchStyle',
            label: localizeMessage('main.menus.app.edit.pasteAndMatchStyle', 'Paste and Match Style'),
            accelerator: 'CmdOrCtrl+SHIFT+V',
        }, {
            role: 'selectall',
            label: localizeMessage('main.menus.app.edit.selectAll', 'Select All'),
            accelerator: 'CmdOrCtrl+A',
        }],
    });

    const devToolsSubMenu = [
        {
            label: localizeMessage('main.menus.app.view.devToolsAppWrapper', 'Developer Tools for Application Wrapper'),
            accelerator: (() => {
                if (process.platform === 'darwin') {
                    return 'Alt+Command+I';
                }
                return 'Ctrl+Shift+I';
            })(),
            click(item: Electron.MenuItem, focusedWindow?: WebContents) {
                if (focusedWindow) {
                    // toggledevtools opens it in the last known position, so sometimes it goes below the browserview
                    if (focusedWindow.isDevToolsOpened()) {
                        focusedWindow.closeDevTools();
                    } else {
                        focusedWindow.openDevTools({mode: 'detach'});
                    }
                }
            },
        },
        {
            label: localizeMessage('main.menus.app.view.devToolsCurrentServer', 'Developer Tools for Current Server'),
            click() {
                ViewManager.getCurrentView()?.openDevTools();
            },
        },
        {
            label: localizeMessage('main.menus.app.view.devToolsSidebar', 'Server Sidebar Dev Tools'),
            click() {
                serversSidebar.openSidebarDevtools();
            },
        },
    ];

    // if (CallsWidgetWindow.isOpen()) {
    //     devToolsSubMenu.push({
    //         label: localizeMessage('main.menus.app.view.devToolsCurrentCallWidget', 'Developer Tools for Call Widget'),
    //         click() {
    //             CallsWidgetWindow.openDevTools();
    //         },
    //     });
    // }

    const viewSubMenu = [{
        label: localizeMessage('main.menus.app.view.find', 'Find..'),
        accelerator: 'CmdOrCtrl+F',
        click() {
            ViewManager.sendToFind();
        },
    }, {
        label: localizeMessage('main.menus.app.view.reload', 'Reload'),
        accelerator: 'CmdOrCtrl+R',
        click() {
            ViewManager.reload();
        },
    }, {
        label: localizeMessage('main.menus.app.view.clearCacheAndReload', 'Clear Cache and Reload'),
        accelerator: 'Shift+CmdOrCtrl+R',
        click() {
            session.defaultSession.clearCache();
            session.defaultSession.clearStorageData();
            TokenManager.reset();
            ViewManager.reload();
        },
    }, {
        role: 'togglefullscreen',
        label: localizeMessage('main.menus.app.view.fullscreen', 'Toggle Full Screen'),
        accelerator: isMac ? 'Ctrl+Cmd+F' : 'F11',
    }, separatorItem, {
        label: localizeMessage('main.menus.app.view.actualSize', 'Actual Size'),
        role: 'resetZoom',
        accelerator: 'CmdOrCtrl+0',
    }, {
        role: 'zoomIn',
        label: localizeMessage('main.menus.app.view.zoomIn', 'Zoom In'),
        accelerator: 'CmdOrCtrl+=',
    }, {
        role: 'zoomIn',
        visible: false,
        accelerator: 'CmdOrCtrl+Shift+=',
    }, {
        role: 'zoomOut',
        label: localizeMessage('main.menus.app.view.zoomOut', 'Zoom Out'),
        accelerator: 'CmdOrCtrl+-',
    }, {
        role: 'zoomOut',
        visible: false,
        accelerator: 'CmdOrCtrl+Shift+-',
    }, separatorItem, {
        id: 'app-menu-downloads',
        label: localizeMessage('main.menus.app.view.downloads', 'Downloads'),
        enabled: downloadsManager.hasDownloads(),
        click() {
            return downloadsManager.openDownloadsDropdown();
        },
    }, separatorItem, {
        label: localizeMessage('main.menus.app.view.devToolsSubMenu', 'Developer Tools'),
        submenu: devToolsSubMenu,
    }];

    if (process.platform !== 'darwin' && process.platform !== 'win32') {
        viewSubMenu.push(separatorItem);
        viewSubMenu.push({
            label: localizeMessage('main.menus.app.view.toggleDarkMode', 'Toggle Dark Mode'),
            click() {
                config.set('darkMode', !config.darkMode);
            },
        });
    }

    template.push({
        id: 'view',
        label: localizeMessage('main.menus.app.view', '&View'),
        submenu: viewSubMenu,
    });
    template.push({
        id: 'history',
        label: localizeMessage('main.menus.app.history', '&History'),
        submenu: [{
            label: localizeMessage('main.menus.app.history.back', 'Back'),
            accelerator: process.platform === 'darwin' ? 'Cmd+[' : 'Alt+Left',
            click: () => {
                ViewManager.getCurrentView()?.goToOffset(-1);
            },
        }, {
            label: localizeMessage('main.menus.app.history.forward', 'Forward'),
            accelerator: process.platform === 'darwin' ? 'Cmd+]' : 'Alt+Right',
            click: () => {
                ViewManager.getCurrentView()?.goToOffset(1);
            },
        }],
    });

    //const servers = ServerManager.getOrderedServers();
    const windowMenu = {
        id: 'window',
        label: localizeMessage('main.menus.app.window', '&Window'),
        role: isMac ? 'windowMenu' : null,
        submenu: [{
            role: 'minimize',
            label: localizeMessage('main.menus.app.window.minimize', 'Minimize'),

            // empty string removes shortcut on Windows; null will default by OS
            accelerator: process.platform === 'win32' ? '' : null,
        }, ...(isMac ? [{
            role: 'zoom',
            label: localizeMessage('main.menus.app.window.zoom', 'Zoom'),
        }, separatorItem,
        ] : []), {
            role: 'close',
            label: isMac ? localizeMessage('main.menus.app.window.closeWindow', 'Close Window') : localizeMessage('main.menus.app.window.close', 'Close'),
            accelerator: 'CmdOrCtrl+W',
        }, separatorItem,

        // ...teams.sort((teamA, teamB) => teamA.order - teamB.order).slice(0, 9).map((team, i) => {
        //     const items = [];
        //     items.push({
        //         label: team.name,
        //         accelerator: `${process.platform === 'darwin' ? 'Cmd+Ctrl' : 'Ctrl+Shift'}+${i + 1}`,
        //         click() {
        //             WindowManager.switchServer(team.name);
        //         },
        //     });
        //     if (WindowManager.getCurrentTeamName() === team.name) {
        //         team.tabs.filter((tab) => tab.isOpen).sort((teamA, teamB) => teamA.order - teamB.order).slice(0, 9).forEach((tab, i) => {
        //             items.push({
        //                 label: `    ${localizeMessage(`common.tabs.${tab.name}`, getTabDisplayName(tab.name as TabType))}`,
        //                 accelerator: `CmdOrCtrl+${i + 1}`,
        //                 click() {
        //                     WindowManager.switchTab(team.name, tab.name);
        //                 },
        //             });
        //         });
        //     }
        //     return items;
        // }).flat(), separatorItem, {
        //     label: localizeMessage('main.menus.app.window.selectNextTab', 'Select Next Tab'),
        //     accelerator: 'Ctrl+Tab',
        //     click() {
        //         WindowManager.selectNextTab();
        //     },
        //     enabled: (teams.length > 1),
        // }, {
        //     label: localizeMessage('main.menus.app.window.selectPreviousTab', 'Select Previous Tab'),
        //     accelerator: 'Ctrl+Shift+Tab',
        //     click() {
        //         WindowManager.selectPreviousTab();
        //     },
        //     enabled: (teams.length > 1),
        // }, ...(isMac ? [separatorItem, {
        //     role: 'front',
        //     label: localizeMessage('main.menus.app.window.bringAllToFront', 'Bring All to Front'),
        // }] : []),
        ],
    };
    template.push(windowMenu);
    const submenu = [];
    if (updateManager && config.canUpgrade) {
        if (updateManager.versionDownloaded) {
            submenu.push({
                label: localizeMessage('main.menus.app.help.restartAndUpdate', 'Restart and Update'),
                click() {
                    updateManager.handleUpdate();
                },
            });
        } else if (updateManager.versionAvailable) {
            submenu.push({
                label: localizeMessage('main.menus.app.help.downloadUpdate', 'Download Update'),
                click() {
                    updateManager.handleDownload();
                },
            });
        } else {
            submenu.push({
                label: localizeMessage('main.menus.app.help.checkForUpdates', 'Check for Updates'),
                click() {
                    updateManager.checkForUpdates(true);
                },
            });
        }
    }
    if (config.helpLink) {
        submenu.push({
            label: localizeMessage('main.menus.app.help.learnMore', 'Learn More...'),
            click() {
                shell.openExternal(config.helpLink!);
            },
        });
        submenu.push(separatorItem);
    }

    /*submenu.push({
        id: 'Show logs',
        label: localizeMessage('main.menus.app.help.ShowLogs', 'Show logs'),
        click() {
            shell.showItemInFolder(log.transports.file.getFile().path);
        },
    });*/

    submenu.push({
        id: 'diagnostics',
        label: localizeMessage('main.menus.app.help.RunDiagnostics', 'Run diagnostics'),
        click() {
            Diagnostics.run();
        },
    });

    submenu.push({id: 'Troubleshooting',
        label: localizeMessage('main.menus.app.help.troubleshooting', 'Troubleshooting'),
        submenu: [{
            label: localizeMessage('main.menus.app.help.troubleshooting.open', 'Open log folder'),
            enabled: true,
            click() {
                shell.showItemInFolder(getLogsPath());
            }}, {
            label: localizeMessage('main.menus.app.help.troubleshooting.clear', 'Clear logs'),
            enabled: true,
            click() {
                fs.unlink(`${getLogsPath()}/kchat-desktop.log`, (err) => {
                    if (err) {
                        throw err;
                    }
                    // eslint-disable-next-line no-console
                    console.log('Delete log file successfully.');
                });
            }}],
    });
    submenu.push(separatorItem);

    const version = localizeMessage('main.menus.app.help.versionString', 'Version {version}{commit}', {
        version: app.getVersion(),
        // eslint-disable-next-line no-undef
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        commit: __HASH_VERSION__ ? localizeMessage('main.menus.app.help.commitString', ' commit: {hashVersion}', {hashVersion: __HASH_VERSION__}) : '',
    });
    submenu.push({
        label: version,
        enabled: true,
        click() {
            clipboard.writeText(version);
        },
    });

    template.push({id: 'help', label: localizeMessage('main.menus.app.help', 'Hel&p'), submenu});
    return template;
}

export function createMenu(config: Config, updateManager: UpdateManager) {
    // TODO: Electron is enforcing certain variables that it doesn't need
    return Menu.buildFromTemplate(createTemplate(config, updateManager) as Array<MenuItemConstructorOptions | MenuItem>);
}

t('common.tabs.TAB_MESSAGING');
t('common.tabs.TAB_FOCALBOARD');
t('common.tabs.TAB_PLAYBOOKS');
