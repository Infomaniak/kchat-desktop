// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import url from 'url';

import {
    initPopupsConfigurationMain,
    setupAlwaysOnTopMain,
    setupPowerMonitorMain,
    setupScreenSharingMain,
    getPopupTarget,
    RemoteDrawMain,
} from '@infomaniak/jitsi-meet-electron-sdk';
import {app, BrowserWindow, ipcMain, shell} from 'electron';

import CallDialingWindow from './callDialingWindow';
import MainWindow from './mainWindow';

import electronBuilder from '../../../electron-builder.json';
import ServerViewState from '../../app/serverViewState';
import {CALL_ENDED, CALL_READY_TO_CLOSE, CALL_RING_CLOSE_WINDOW, CALL_RING_WINDOW_IS_OPEN} from '../../common/communication';
import {Logger} from '../../common/log';
import {composeUserAgent, getLocalPreload, getLocalURLString} from '../utils';
import ViewManager from '../views/viewManager';

type CallInfoNotifyProps = {
    push: string;
    email: string;
    channel: string;
    desktop: string;
    comments: string;
    first_name: string;
    push_status: string;
    mention_keys: string;
    push_threads: string;
    desktop_sound: string;
    email_threads: string;
    desktop_threads: string;
    desktop_notification_sound: string;
};

type CallInfoTimezone = {
    automaticTimezone: string;
    manualTimezone: string;
    useAutomaticTimezone: string;
};

type CallInfoProps = {
    show_last_active: string;
    customStatus: string;
};

type CallInfoUser = {
    id: string;
    user_id: number;
    team_id: string;
    create_at: number;
    update_at: number;
    delete_at: number;
    last_picture_update: number;
    username: string;
    email: string;
    nickname: string;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    roles: string;
    auth_data: string;
    auth_service: string;
    position: string;
    allow_marketing: boolean;
    notify_props: CallInfoNotifyProps;
    last_password_update: number;
    locale: string;
    props: CallInfoProps;
    timezone: CallInfoTimezone;
    disable_welcome_email: boolean;
};

export interface CallInfo {
    avatar: string;
    user: CallInfoUser;
    channelID: string;
    conferenceId: string;
    name: string;
    locale: string;
    jwt: string;
}

const log = new Logger('KmeetCallWindow');

/**
 * Opens the given link in an external browser.
 *
 * @param {string} link - The link (URL) that should be opened in the external browser.
 * @returns {void}
 */
export function openExternalLink(link: string) {
    let u;

    try {
        u = url.parse(link);
    } catch (e) {
        return;
    }

    const proto = u.protocol;
    const href = u.href;

    if (proto === 'http:' || proto === 'https:' || proto === 'mailto:') {
        shell.openExternal(href);
    }
}

class KmeetCallWindow {
    private callWindow?: BrowserWindow;
    private callInfo?: CallInfo;

    constructor() {
        ipcMain.handle('get-call-info', () => this.callInfo);
        ipcMain.on(CALL_ENDED, this.handleCallEnded);
        ipcMain.on(CALL_READY_TO_CLOSE, this.handleCallEnded);
        ipcMain.on(CALL_RING_CLOSE_WINDOW, this.handleCloseRingWindow);
        ipcMain.handle(CALL_RING_WINDOW_IS_OPEN, this.handleIsCallWindowOpen);
    }

    create(callInfo: CallInfo) {
        const mainWindow = MainWindow.get();
        const currentServer = ServerViewState!.getCurrentServer();

        log.info('callInfo', callInfo);

        if (!mainWindow || !currentServer) {
            log.error('Main window does not exist');
            return;
        }

        if (this.callWindow) {
            this.destroy();
        }

        if (CallDialingWindow.isClosable()) {
            this.closeRingWindow();
        }

        const preload = getLocalPreload('call.js');
        const session = mainWindow.webContents.session;

        this.callWindow = new BrowserWindow({

            // parent: mainWindow,
            title: callInfo.name,
            show: true,
            center: true,
            webPreferences: {
                preload,
                session,
                sandbox: false,
                enableBlinkFeatures: 'WebAssemblyCSP',
                nodeIntegration: true,
                contextIsolation: false,
            },
        });

        this.callInfo = callInfo;

        const localURL = getLocalURLString('call.html');
        this.callWindow.loadURL(localURL, {
            userAgent: composeUserAgent(),
        }).catch(
            (reason) => {
                log.error(`Call window failed to load: ${reason}`);
                log.info(process.env);
            });

        this.callWindow.webContents.on('dom-ready', () => {
            this.callWindow!.webContents.send('load-server-url', `${currentServer.url.toString()}static/kmeet.js`);
        });

        this.callWindow.moveTop();

        const windowOpenHandler = ({url, frameName}: {url: string; frameName: string}) => {
            const target = getPopupTarget(url, frameName);

            if (!target || target === 'browser') {
                openExternalLink(url);

                return {action: 'deny'};
            }

            if (target === 'electron') {
                return {action: 'allow'};
            }

            return {action: 'deny'};
        };

        initPopupsConfigurationMain(this.callWindow);
        setupAlwaysOnTopMain(this.callWindow, null, windowOpenHandler);
        setupPowerMonitorMain(this.callWindow);
        setupScreenSharingMain(this.callWindow, app.getName(), electronBuilder.appId);
        new RemoteDrawMain(this.callWindow); // eslint-disable-line no-new
    }

    destroy() {
        try {
            if (this.callWindow?.closable) {
                this.callWindow?.destroy();
            }
        } catch (error) {
            log.debug('Kmeet window could not be destroyed', error);
        }

        this.callInfo = {};
        this.callWindow = undefined;
    }

    private handleCallEnded = (_: any, message: any) => {
        this.destroy();
        ViewManager.sendToAllViews(CALL_ENDED, message);
    };

    private closeRingWindow = () => {
        CallDialingWindow.destroy();
    };

    private handleCloseRingWindow = () => {
        this.closeRingWindow();
    };

    private handleIsCallWindowOpen = () => {
        return CallDialingWindow.isClosable();
    };
}

const kmeetCallWindow = new KmeetCallWindow();
export default kmeetCallWindow;
