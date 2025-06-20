// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import path from 'path';
import URL from 'url';

import {init} from '@sentry/electron/main';
import {app, ipcMain, nativeTheme, session} from 'electron';
import installExtension, {REACT_DEVELOPER_TOOLS} from 'electron-extension-installer';
import isDev from 'electron-is-dev';

import {
    FOCUS_BROWSERVIEW,
    QUIT,
    NOTIFY_MENTION,
    UPDATE_SHORTCUT_MENU,
    GET_AVAILABLE_SPELL_CHECKER_LANGUAGES,
    USER_ACTIVITY_UPDATE,
    START_UPGRADE,
    START_UPDATE_DOWNLOAD,
    START_UPDATE_DOWNLOAD_MANUAL,
    SERVERS_URL_MODIFIED,
    PING_DOMAIN,
    OPEN_APP_MENU,
    GET_CONFIGURATION,
    GET_LOCAL_CONFIGURATION,
    UPDATE_CONFIGURATION,
    UPDATE_PATHS,
    GET_DARK_MODE,
    WINDOW_CLOSE,
    WINDOW_MAXIMIZE,
    WINDOW_MINIMIZE,
    WINDOW_RESTORE,
    DOUBLE_CLICK_ON_WINDOW,
    TOGGLE_SECURE_INPUT,
    UPDATE_TEAMS,
    SERVERS_UPDATE,
    GET_APP_THEME,
    GET_APP_INFO,
    CALL_OPEN_WINDOW,
    SCREEN_SHARE_PERMISSIONS,
} from 'common/communication';
import Config from 'common/config';
import buildConfig from 'common/config/buildConfig';
import {IKOrigin} from 'common/config/ikConfig';
import {Logger} from 'common/log';
import ServerManager from 'common/servers/serverManager';
import {IKDriveAllowedUrls, IKLoginAllowedUrls, IKWelcomeAllowedUrls, KChatTokenWhitelist} from 'common/utils/constants';
import AllowProtocolDialog from 'main/allowProtocolDialog';
import AppVersionManager from 'main/AppVersionManager';
import AuthManager from 'main/authManager';
import AutoLauncher from 'main/AutoLauncher';
import updateManager from 'main/autoUpdater';
import {setupBadge} from 'main/badge';
import CertificateManager from 'main/certificateManager';
import {configPath, updatePaths} from 'main/constants';
import CriticalErrorHandler from 'main/CriticalErrorHandler';
import downloadsManager from 'main/downloadsManager';
import i18nManager from 'main/i18nManager';
import parseArgs from 'main/ParseArgs';
import PermissionsManager from 'main/permissionsManager';
import TokenManager from 'main/tokenManager';
import Tray from 'main/tray/tray';
import TrustedOriginsStore from 'main/trustedOrigins';
import UserActivityMonitor from 'main/UserActivityMonitor';
import ViewManager from 'main/views/viewManager';
import MainWindow from 'main/windows/mainWindow';

import type {ConfigServer} from 'types/config';

import {
    handleAppBeforeQuit,
    handleAppBrowserWindowCreated,
    handleAppCertificateError,
    handleAppSecondInstance,
    handleAppWillFinishLaunching,
    handleAppWindowAllClosed,
    handleChildProcessGone,
} from './app';
import {
    handleConfigUpdate,
    handleDarkModeChange,
    handleGetConfiguration,
    handleGetLocalConfiguration,
    handleUpdateTheme,
    updateConfiguration,
} from './config';
import {
    handleMainWindowIsShown,
    handleAppVersion,
    handleMentionNotification,
    handleOpenAppMenu,
    handleQuit,
    handlePingDomain,
    handleToggleSecureInput,
    handleGetTheme,
    handleOpenKmeetWindow,
    getScreenPermissions,
} from './intercom';
import {
    clearAppCache,
    getDeeplinkingURL,
    handleUpdateMenuEvent,
    shouldShowTrayIcon,
    updateSpellCheckerLocales,
    wasUpdated,
    migrateMacAppStore,
    updateServerInfos,
    flushCookiesStore,
} from './utils';
import {
    handleClose,
    handleDoubleClick,
    handleGetDarkMode,
    handleMaximize,
    handleMinimize,
    handleRestore,
} from './windows';

import {protocols} from '../../../electron-builder.json';

export const mainProtocol = protocols?.[0]?.schemes?.[0];

const log = new Logger('App.Initialize');

/**
 * Main entry point for the application, ensures that everything initializes in the proper order
 */
export async function initialize() {
    CriticalErrorHandler.init();
    global.willAppQuit = false;

    // initialization that can run before the app is ready
    initializeArgs();

    init({
        dsn: 'https://bafc5cd5580a437a9bfd407e8d5f69bf@sentry-kchat.infomaniak.com/5',
    });

    await initializeConfig();
    initializeAppEventListeners();
    initializeBeforeAppReady();

    // wait for registry config data to load and app ready event
    await Promise.all([
        app.whenReady(),
        Config.initRegistry(),
    ]);

    // no need to continue initializing if app is quitting
    if (global.willAppQuit) {
        return;
    }

    // eslint-disable-next-line no-undef
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (__IS_MAC_APP_STORE__) {
        migrateMacAppStore();
    }

    // initialization that should run once the app is ready
    initializeInterCommunicationEventListeners();
    await initializeAfterAppReady();
}

//
// initialization sub functions
//

function initializeArgs() {
    global.args = parseArgs(process.argv.slice(1));

    global.isDev = isDev && !global.args.disableDevMode; // this doesn't seem to be right and isn't used as the single source of truth

    if (global.args.dataDir) {
        app.setPath('userData', path.resolve(global.args.dataDir));
        updatePaths(true);
    }
}

async function initializeConfig() {
    return new Promise<void>((resolve) => {
        Config.once('update', (configData) => {
            Config.on('update', handleConfigUpdate);
            Config.on('darkModeChange', handleDarkModeChange);
            Config.on('error', (error) => {
                log.error(error);
            });
            handleConfigUpdate(configData);

            // can only call this before the app is ready
            // eslint-disable-next-line no-undef
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (Config.enableHardwareAcceleration === false || __DISABLE_GPU__) {
                app.disableHardwareAcceleration();
            }

            resolve();
        });
        Config.init(configPath, app.name, app.getAppPath());
        ipcMain.on(UPDATE_PATHS, () => {
            log.debug('Config.UPDATE_PATHS');

            Config.setConfigPath(configPath);
            if (Config.data) {
                Config.reload();
            }
        });
    });
}

function initializeAppEventListeners() {
    app.on('second-instance', handleAppSecondInstance);
    app.on('window-all-closed', handleAppWindowAllClosed);
    app.on('browser-window-created', handleAppBrowserWindowCreated);
    app.on('activate', () => MainWindow.show());
    app.on('before-quit', handleAppBeforeQuit);
    app.on('certificate-error', handleAppCertificateError);
    app.on('select-client-certificate', CertificateManager.handleSelectCertificate);
    app.on('child-process-gone', handleChildProcessGone);
    app.on('login', AuthManager.handleAppLogin);
    app.on('will-finish-launching', handleAppWillFinishLaunching);

    // Somehow cookies are not immediately saved to disk.
    // So manually flush cookie store to disk on closing the app.
    // https://github.com/electron/electron/issues/8416
    // TODO: We can remove this once every server supported will flush on login/logout
    app.on('before-quit', flushCookiesStore);
}

function initializeBeforeAppReady() {
    if (!Config.data) {
        log.error('No config loaded');
        return;
    }

    if (process.platform === 'darwin' && process.arch === 'x64') {
        updateConfiguration(null, [{key: 'enableHardwareAcceleration', data: false}]);
    }

    // if (process.env.NODE_ENV !== 'test') {
    // app.enableSandbox();
    // }
    TrustedOriginsStore.load();

    // prevent using a different working directory, which happens on windows running after installation.
    const expectedPath = path.dirname(process.execPath);
    if (process.cwd() !== expectedPath && !isDev) {
        log.warn(`Current working directory is ${process.cwd()}, changing into ${expectedPath}`);
        process.chdir(expectedPath);
    }

    Tray.refreshImages(Config.trayIconTheme);

    // If there is already an instance, quit this one
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!__IS_MAC_APP_STORE__) {
        const gotTheLock = app.requestSingleInstanceLock();
        if (!gotTheLock) {
            app.exit();
            global.willAppQuit = true;
        }
    }

    AllowProtocolDialog.init();

    // Alows protocol in dev
    if (mainProtocol) {
        app.setAsDefaultProtocolClient(mainProtocol);
    }

    // if (isDev && process.env.NODE_ENV !== 'test') {
    //     log.info('In development mode, deeplinking is disabled');
    // } else if (mainProtocol) {
    //     app.setAsDefaultProtocolClient(mainProtocol);
    // }

    if (process.platform === 'darwin' || process.platform === 'win32') {
        nativeTheme.on('updated', handleUpdateTheme);
        handleUpdateTheme();
    }
}

function initializeInterCommunicationEventListeners() {
    ipcMain.on('initialize-jitsi', handleInitializeJitsi);
    ipcMain.handle(NOTIFY_MENTION, handleMentionNotification);
    ipcMain.handle(GET_APP_THEME, handleGetTheme);
    ipcMain.handle(GET_APP_INFO, handleAppVersion);
    ipcMain.on(UPDATE_SHORTCUT_MENU, handleUpdateMenuEvent);
    ipcMain.on(FOCUS_BROWSERVIEW, ViewManager.focusCurrentView);

    if (process.platform !== 'darwin') {
        ipcMain.on(OPEN_APP_MENU, handleOpenAppMenu);
    }

    ipcMain.on(QUIT, handleQuit);

    ipcMain.handle(GET_AVAILABLE_SPELL_CHECKER_LANGUAGES, () => session.defaultSession.availableSpellCheckerLanguages);
    ipcMain.on(START_UPDATE_DOWNLOAD, handleStartDownload);
    ipcMain.on(START_UPDATE_DOWNLOAD_MANUAL, handleStartDownloadManual);
    ipcMain.on(START_UPGRADE, handleStartUpgrade);
    ipcMain.handle(PING_DOMAIN, handlePingDomain);
    ipcMain.handle(GET_CONFIGURATION, handleGetConfiguration);
    ipcMain.handle(GET_LOCAL_CONFIGURATION, handleGetLocalConfiguration);
    ipcMain.on(UPDATE_CONFIGURATION, updateConfiguration);
    ipcMain.on(UPDATE_TEAMS, updateTeamsHandler);
    ipcMain.handle(GET_DARK_MODE, handleGetDarkMode);
    ipcMain.on(WINDOW_CLOSE, handleClose);
    ipcMain.on(WINDOW_MAXIMIZE, handleMaximize);
    ipcMain.on(WINDOW_MINIMIZE, handleMinimize);
    ipcMain.on(WINDOW_RESTORE, handleRestore);
    ipcMain.on(DOUBLE_CLICK_ON_WINDOW, handleDoubleClick);
    ipcMain.on(SCREEN_SHARE_PERMISSIONS, getScreenPermissions);

    ipcMain.on(TOGGLE_SECURE_INPUT, handleToggleSecureInput);
    ipcMain.on(CALL_OPEN_WINDOW, handleOpenKmeetWindow);
}

function handleInitializeJitsi() {

}

function updateTeamsHandler(_: any, servers: ConfigServer[]) {
    const [defaultServer] = buildConfig.defaultServers!;
    const [firstServer] = servers;

    if (!servers.length) {
        ServerManager.removePredefinedServersHandler(true);
        ServerManager.removePredefinedServersHandler(false);

        ServerManager.emit(SERVERS_UPDATE);

        return;
    }

    // Check if it's first call to fetch kchat info with kchat.infomaniak.com
    if (defaultServer?.url && firstServer.url === defaultServer.url) {
        initIKserver();
    } else {
        initReceivedServer(servers);
    }
}

function initIKserver() {
    ServerManager.removePredefinedServersHandler(false);
    ServerManager.reloadFromConfig();
    ServerManager.emit(SERVERS_UPDATE);
}

function initReceivedServer(servers: ConfigServer[]) {
    ServerManager.removePredefinedServersHandler(true);
    ServerManager.manageServersReceivedHandler(servers);
}

async function initializeAfterAppReady() {
    ServerManager.reloadFromConfig();
    updateServerInfos(ServerManager.getAllServers());
    ServerManager.on(SERVERS_URL_MODIFIED, (serverIds?: string[]) => {
        if (serverIds && serverIds.length) {
            updateServerInfos(serverIds.map((srvId) => ServerManager.getServer(srvId)!));
        }
    });

    app.setAppUserModelId('Kchat.Desktop'); // Use explicit AppUserModelID
    const defaultSession = session.defaultSession;
    defaultSession.webRequest.onHeadersReceived({urls: IKLoginAllowedUrls},
        (d, c) => {
            if (d.url.includes('/token') && d.responseHeaders) {
                if (!d.responseHeaders['access-control-allow-origin']) {
                    d.responseHeaders['access-control-allow-origin'] = [IKOrigin];
                }
                if (!d.responseHeaders['access-control-allow-credentials']) {
                    d.responseHeaders['access-control-allow-credentials'] = ['true'];
                }
                if (!d.responseHeaders['access-control-allow-headers']) {
                    d.responseHeaders['access-control-allow-headers'] = ['X-Requested-With, Authorization', 'Webapp-Version'];
                }
                if (!d.responseHeaders['access-control-allow-methods']) {
                    d.responseHeaders['access-control-allow-methods'] = ['GET, POST, OPTIONS, PUT, DELETE'];
                }
            }

            c({
                cancel: false,
                responseHeaders: d.responseHeaders,
            });
        },
    );

    /*
        Inject token, for kdrive, images and websocket, rest is handled by the web client.
     */
    defaultSession.webRequest.onBeforeSendHeaders({urls: [
        ...KChatTokenWhitelist,
        ...IKDriveAllowedUrls,
        ...IKWelcomeAllowedUrls,
    ]},
    (d, c) => {
        const authHeader = d.requestHeaders.Authorization ? d.requestHeaders.Authorization : null;
        const ikToken = TokenManager.getToken();

        // No Authorization header or bearer is empty
        if ((!authHeader || !authHeader?.split(' ')[1]) && ikToken.token) {
            d.requestHeaders.Authorization = `Bearer ${ikToken.token}`;
        }

        c({
            cancel: false,
            requestHeaders: d.requestHeaders,
        });
    },
    );
    if (process.platform !== 'darwin') {
        defaultSession.on('spellcheck-dictionary-download-failure', (event, lang) => {
            if (Config.spellCheckerURL) {
                log.error(`There was an error while trying to load the dictionary definitions for ${lang} from fully the specified url. Please review you have access to the needed files. Url used was ${Config.spellCheckerURL}`);
            } else {
                log.warn(`There was an error while trying to download the dictionary definitions for ${lang}, spellchecking might not work properly.`);
            }
        });

        if (Config.spellCheckerURL) {
            const spellCheckerURL = Config.spellCheckerURL.endsWith('/') ? Config.spellCheckerURL : `${Config.spellCheckerURL}/`;
            log.info(`Configuring spellchecker using download URL: ${spellCheckerURL}`);
            defaultSession.setSpellCheckerDictionaryDownloadURL(spellCheckerURL);

            defaultSession.on('spellcheck-dictionary-download-success', (event, lang) => {
                log.info(`Dictionary definitions downloaded successfully for ${lang}`);
            });
        }
        updateSpellCheckerLocales();
    }

    if (typeof Config.canUpgrade === 'undefined') {
        // windows might not be ready, so we have to wait until it is
        Config.once('update', () => {
            log.debug('checkForUpdates');
            if (Config.canUpgrade && Config.autoCheckForUpdates) {
                setTimeout(() => {
                    updateManager.checkForUpdates(false);
                }, 5000);
            } else {
                log.info(`Autoupgrade disabled: ${Config.canUpgrade}`);
            }
        });
    } else if (Config.canUpgrade && Config.autoCheckForUpdates) {
        setTimeout(() => {
            updateManager.checkForUpdates(false);
        }, 5000);
    } else {
        log.info(`Autoupgrade disabled: ${Config.canUpgrade}`);
    }

    if (!global.isDev) {
        AutoLauncher.upgradeAutoLaunch();
    }

    // eslint-disable-next-line no-undef
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (global.isDev || __IS_NIGHTLY_BUILD__) {
        installExtension(REACT_DEVELOPER_TOOLS, {
            loadExtensionOptions: {
                allowFileAccess: true,
            },
        }).
            then((name) => log.info(`Added Extension:  ${name}`)).
            catch((err) => log.error('An error occurred: ', err));
    }

    MainWindow.show();

    let deeplinkingURL;

    // Protocol handler for win32
    if (process.platform === 'win32') {
        const args = process.argv.slice(1);
        if (Array.isArray(args) && args.length > 0) {
            deeplinkingURL = getDeeplinkingURL(args);
            if (deeplinkingURL) {
                ViewManager.handleDeepLink(deeplinkingURL);
            }
        }
    }

    // listen for status updates and pass on to renderer
    UserActivityMonitor.on('status', (status) => {
        log.debug('UserActivityMonitor.on(status)', status);
        ViewManager.sendToAllViews(USER_ACTIVITY_UPDATE, status.userIsActive, status.idleTime, status.isSystemEvent);
    });

    // start monitoring user activity (needs to be started after the app is ready)
    UserActivityMonitor.startMonitoring();

    if (shouldShowTrayIcon()) {
        Tray.init(Config.trayIconTheme);
    }
    setupBadge();

    defaultSession.on('will-download', downloadsManager.handleNewDownload);

    // needs to be done after app ready
    // must be done before update menu
    if (Config.appLanguage) {
        i18nManager.setLocale(Config.appLanguage);
    } else if (!i18nManager.setLocale(app.getLocale())) {
        i18nManager.setLocale(app.getLocaleCountryCode());
    }

    handleUpdateMenuEvent();

    ipcMain.emit('update-dict');

    // handle permission requests
    // - approve if a supported permission type and the request comes from the renderer or one of the defined servers
    defaultSession.setPermissionRequestHandler(PermissionsManager.handlePermissionRequest);

    if (wasUpdated(AppVersionManager.lastAppVersion)) {
        clearAppCache();
    }
    AppVersionManager.lastAppVersion = app.getVersion();

    handleMainWindowIsShown();
}

function handleStartDownload() {
    if (updateManager) {
        updateManager.handleDownload();
    }
}

function handleStartDownloadManual() {
    if (updateManager) {
        updateManager.handleDownloadManual();
    }
}

function handleStartUpgrade() {
    if (updateManager) {
        updateManager.handleUpdate();
    }
}
