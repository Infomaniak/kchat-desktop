// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {BrowserWindow, ipcMain} from 'electron';
import log from 'electron-log';

import {CALL_CANCEL, CALL_DECLINED, CALL_DIAL_UPDATED, CALL_JOINED, MAIN_WINDOW_FOCUSED} from 'common/communication';
import {getDoNotDisturb} from 'main/notifications';
import ViewManager from 'main/views/viewManager';

import type {IkCallInfo} from 'types/callsIk';

import MainWindow from './mainWindow';

import {getLocalPreload} from '../utils';

class CallDialingWindow {
    private window?: BrowserWindow;
    private pendingCallInfo?: IkCallInfo;
    private focusListener?: () => void;
    private pendingTimeout?: ReturnType<typeof setTimeout>;

    constructor() {
        ipcMain.on(CALL_JOINED, (_, callInfo: IkCallInfo) => this.handleCallAccepted(callInfo));
        ipcMain.on(CALL_DECLINED, (_, callInfo: IkCallInfo) => this.handleCallDeclined(callInfo));
        ipcMain.on(CALL_CANCEL, (_, callInfo: IkCallInfo) => this.handleCallCancel(callInfo));
        ipcMain.on(CALL_DIAL_UPDATED, (_, callInfo: IkCallInfo) => this.handleCallInfoUpdated(callInfo));
    }

    async create(callInfo: IkCallInfo) {
        if (this.window) {
            return;
        }

        const dnd = await getDoNotDisturb();

        if (this.window) {
            return;
        }

        const mainWindow = MainWindow.get();
        const hasFocus = Boolean(mainWindow?.isFocused());

        if (!dnd) {
            this.openWindow(callInfo, false, false);
            return;
        }

        if (hasFocus) {
            this.openWindow(callInfo, true, true);
            return;
        }

        if (this.pendingCallInfo) {
            this.cleanupPending(true);
        }

        this.pendingCallInfo = callInfo;
        this.focusListener = () => {
            if (this.pendingCallInfo) {
                this.openWindow(this.pendingCallInfo, true, true);
            }
            this.cleanupPending();
        };
        MainWindow.on(MAIN_WINDOW_FOCUSED, this.focusListener);
        this.pendingTimeout = setTimeout(() => {
            this.cleanupPending(true);
        }, callInfo.toneTimeOut || 30000);
    }

    private openWindow(callInfo: IkCallInfo, silent: boolean, noTop: boolean) {
        const mainWindow = MainWindow.get();
        const mainSession = mainWindow!.webContents.session;
        const preload = getLocalPreload('callDial.js');
        const localURL = 'kchat-desktop://renderer/callDialing.html';

        const callDialWindow = new BrowserWindow({
            width: 280,
            height: 230,
            titleBarStyle: 'hiddenInset',
            hasShadow: true,
            minimizable: false,
            maximizable: false,
            resizable: false,
            alwaysOnTop: !noTop,
            show: false,
            fullscreen: false,
            fullscreenable: false,
            frame: false,
            webPreferences: {
                preload,
                session: mainSession,
            },
        });

        callDialWindow.setTitle('kChat');
        callDialWindow.setMenuBarVisibility(false);
        callDialWindow.loadURL(localURL).catch(
            (reason) => {
                log.error(`Settings window failed to load: ${reason}`);
                log.info(process.env);
            });

        if (silent || noTop) {
            callDialWindow.webContents.once('dom-ready', () => {
                callDialWindow.showInactive();
            });
        } else {
            callDialWindow.webContents.once('dom-ready', () => {
                callDialWindow.show();
            });
        }

        callDialWindow.webContents.on('did-finish-load', () => {
            callDialWindow.webContents.send('info-received', {...callInfo, silent});
        });
        callDialWindow.on('close', () => {
            this.handleCallDeclined(callInfo);
        });

        const withDevTools = Boolean(process.env.MM_DEBUG_SETTINGS) || false;

        if (withDevTools) {
            callDialWindow.webContents.openDevTools({mode: 'detach'});
        }

        this.window = callDialWindow;
    }

    destroy() {
        if (this.window && this.window.isClosable()) {
            this.window.destroy();
            this.window = undefined;
        }
        this.cleanupPending();
    }

    private clearPendingTimeout() {
        if (this.pendingTimeout) {
            clearTimeout(this.pendingTimeout);
            this.pendingTimeout = undefined;
        }
    }

    private removeFocusListener() {
        if (this.focusListener) {
            MainWindow.off(MAIN_WINDOW_FOCUSED, this.focusListener);
            this.focusListener = undefined;
        }
    }

    private cleanupPending(sendDeclined = false) {
        this.clearPendingTimeout();
        this.removeFocusListener();
        if (sendDeclined && this.pendingCallInfo) {
            ViewManager.sendToAllViews(CALL_DECLINED, this.pendingCallInfo);
        }
        this.pendingCallInfo = undefined;
    }

    isClosable() {
        return Boolean(this.window?.isClosable());
    }

    private handleCallInfoUpdated = (callInfo: IkCallInfo) => {
        ViewManager.sendToAllViews(CALL_DIAL_UPDATED, callInfo);
    };

    private handleCallDeclined = (callInfo: IkCallInfo) => {
        this.destroy();
        ViewManager.sendToAllViews(CALL_DECLINED, callInfo);
    };

    private handleCallAccepted = (callInfo: IkCallInfo) => {
        this.destroy();
        ViewManager.sendToAllViews(CALL_JOINED, callInfo);
    };

    private handleCallCancel = (callInfo: IkCallInfo) => {
        this.destroy();
        ViewManager.sendToAllViews(CALL_CANCEL, callInfo);
    };
}

const callDialingWindow = new CallDialingWindow();
export default callDialingWindow;
