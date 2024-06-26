// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import type {IpcRendererEvent} from 'electron';
import {contextBridge, ipcRenderer, webFrame} from 'electron';

import type {DesktopAPI} from '@mattermost/desktop-api';

import {
    NOTIFY_MENTION,
    IS_UNREAD,
    UNREAD_RESULT,
    SESSION_EXPIRED,
    REACT_APP_INITIALIZED,
    USER_ACTIVITY_UPDATE,
    BROWSER_HISTORY_PUSH,
    APP_LOGGED_IN,
    APP_LOGGED_OUT,
    GET_VIEW_INFO_FOR_TEST,
    DESKTOP_SOURCES_RESULT,
    VIEW_FINISHED_RESIZING,
    CALLS_JOIN_CALL,
    CALLS_JOINED_CALL,
    CALLS_LEAVE_CALL,
    DESKTOP_SOURCES_MODAL_REQUEST,
    CALLS_WIDGET_SHARE_SCREEN,
    CALLS_ERROR,
    CALLS_JOIN_REQUEST,
    GET_IS_DEV_MODE,
    TOGGLE_SECURE_INPUT,
    GET_APP_INFO,
    REQUEST_BROWSER_HISTORY_STATUS,
    BROWSER_HISTORY_STATUS_UPDATED,
    NOTIFICATION_CLICKED,
    CALLS_WIDGET_RESIZE,
    CALLS_WIDGET_CHANNEL_LINK_CLICK,
    CALLS_LINK_CLICK,
    CALLS_POPOUT_FOCUS,
    GET_DESKTOP_SOURCES,
    UNREADS_AND_MENTIONS,
    LEGACY_OFF,

    // Infomaniak
    CALL_CLOSED,
    CALL_DECLINED,
    CALL_DIALING,
    CALL_JOINED,
    CALL_RINGING,
    UPDATE_TEAMS,
    RESET_TEAMS,
    TOKEN_REFRESHED,
    TOKEN_REQUEST,
    REFRESH_TOKEN,
    RESET_TOKEN,
    SERVER_ADDED,
    SERVER_DELETED,
    RESET_AUTH,
    SWITCH_SERVER,
    RELOAD_CURRENT_VIEW,
    PREFERRED_THEME,
    TEAMS_ORDER_PREFERENCE,
    TEAMS_ORDER_PREFERENCE_UPDATED,
    USER_LOCALE,
    GET_SERVER_THEME,
    GET_APP_THEME,
    THEME_CHANGED,
    CALL_ENDED,
    CALL_OPEN_WINDOW,
    CALL_RING_CLOSE_WINDOW,
    CALL_RING_WINDOW_IS_OPEN,
    CALL_CANCEL,
    SWITCH_SERVER_SIDEBAR,
    CALL_JOINED_BROWSER,
} from 'common/communication';
import {IKOrigin} from 'common/config/ikConfig';
import type {CallInfo} from 'main/windows/kmeetCallWindow';

import type {ExternalAPI} from 'types/externalAPI';

const createListener: ExternalAPI['createListener'] = (channel: string, listener: (...args: never[]) => void) => {
    const listenerWithEvent = (_: IpcRendererEvent, ...args: unknown[]) =>
        listener(...args as never[]);
    ipcRenderer.on(channel, listenerWithEvent);
    return () => {
        ipcRenderer.off(channel, listenerWithEvent);
    };
};

type KchatDesktopApi = DesktopAPI & {
    openKmeetCallWindow: (callInfo: object) => void;
    closeRingCallWindow: () => void;
    isRingCallWindowOpen: () => void;
}

const desktopAPI: KchatDesktopApi = {

    // Initialization
    isDev: () => ipcRenderer.invoke(GET_IS_DEV_MODE),
    getAppInfo: () => {
        // Using this signal as the sign to disable the legacy code, since it is run before the app is rendered
        if (legacyEnabled) {
            legacyOff();
        }

        return ipcRenderer.invoke(GET_APP_INFO);
    },
    reactAppInitialized: () => ipcRenderer.send(REACT_APP_INITIALIZED),

    // Session
    setSessionExpired: (isExpired) => ipcRenderer.send(SESSION_EXPIRED, isExpired),
    onUserActivityUpdate: (listener) => createListener(USER_ACTIVITY_UPDATE, listener),

    onLogin: () => ipcRenderer.send(APP_LOGGED_IN),
    onLogout: () => ipcRenderer.send(APP_LOGGED_OUT),

    // Unreads/mentions/notifications
    sendNotification: (title, body, channelId, teamId, url, silent, soundName) =>
        ipcRenderer.invoke(NOTIFY_MENTION, title, body, channelId, teamId, url, silent, soundName),
    onNotificationClicked: (listener) => createListener(NOTIFICATION_CLICKED, listener),
    setUnreadsAndMentions: (isUnread, mentionCount) => ipcRenderer.send(UNREADS_AND_MENTIONS, isUnread, mentionCount),

    // Navigation
    requestBrowserHistoryStatus: () => ipcRenderer.invoke(REQUEST_BROWSER_HISTORY_STATUS),
    onBrowserHistoryStatusUpdated: (listener) => createListener(BROWSER_HISTORY_STATUS_UPDATED, listener),
    onBrowserHistoryPush: (listener) => createListener(BROWSER_HISTORY_PUSH, listener),
    sendBrowserHistoryPush: (path) => ipcRenderer.send(BROWSER_HISTORY_PUSH, path),

    // Calls
    joinCall: (opts) => ipcRenderer.invoke(CALLS_JOIN_CALL, opts),
    leaveCall: () => ipcRenderer.send(CALLS_LEAVE_CALL),
    openCallDialing: (callInfo: CallInfo) => ipcRenderer.send(CALL_RINGING, callInfo),

    callsWidgetConnected: (callID, sessionID) => ipcRenderer.send(CALLS_JOINED_CALL, callID, sessionID),
    resizeCallsWidget: (width, height) => ipcRenderer.send(CALLS_WIDGET_RESIZE, width, height),

    sendCallsError: (err, callID, errMsg) => ipcRenderer.send(CALLS_ERROR, err, callID, errMsg),
    onCallsError: (listener) => createListener(CALLS_ERROR, listener),

    getDesktopSources: (opts) => ipcRenderer.invoke(GET_DESKTOP_SOURCES, opts),
    openScreenShareModal: () => ipcRenderer.send(DESKTOP_SOURCES_MODAL_REQUEST),
    onOpenScreenShareModal: (listener) => createListener(DESKTOP_SOURCES_MODAL_REQUEST, listener),

    shareScreen: (sourceID, withAudio) => ipcRenderer.send(CALLS_WIDGET_SHARE_SCREEN, sourceID, withAudio),
    onScreenShared: (listener) => createListener(CALLS_WIDGET_SHARE_SCREEN, listener),

    sendJoinCallRequest: (callId) => ipcRenderer.send(CALLS_JOIN_REQUEST, callId),
    onJoinCallRequest: (listener) => createListener(CALLS_JOIN_REQUEST, listener),

    openLinkFromCalls: (url) => ipcRenderer.send(CALLS_LINK_CLICK, url),

    openKmeetCallWindow: (callInfo) => ipcRenderer.send(CALL_OPEN_WINDOW, callInfo),
    closeRingCallWindow: () => ipcRenderer.send(CALL_RING_CLOSE_WINDOW),
    isRingCallWindowOpen: () => ipcRenderer.invoke(CALL_RING_WINDOW_IS_OPEN),

    focusPopout: () => ipcRenderer.send(CALLS_POPOUT_FOCUS),
    closeDial: () => ipcRenderer.send(CALL_JOINED_BROWSER),

    // Utility
    unregister: (channel) => ipcRenderer.removeAllListeners(channel),
};
contextBridge.exposeInMainWorld('desktopAPI', desktopAPI);

// const logPrefix = '[current server]';

// contextBridge.exposeInMainWorld('logManager', {
//     info: (...args: unknown[]) => log.info(logPrefix, ...args),
//     debug: (...args: unknown[]) => log.debug(logPrefix, ...args),
//     log: (...args: unknown[]) => log.log(logPrefix, ...args),
//     warn: (...args: unknown[]) => log.warn(logPrefix, ...args),
//     error: (...args: unknown[]) => log.error(logPrefix, ...args),
// });

contextBridge.exposeInMainWorld('authManager', {
    tokenRequest: () => ipcRenderer.invoke(TOKEN_REQUEST),
    refreshToken: () => ipcRenderer.invoke(REFRESH_TOKEN),
    resetToken: () => ipcRenderer.invoke(RESET_TOKEN),
    addTeam: (d) => ipcRenderer.invoke(SERVER_ADDED, d),
    deleteTeam: () => ipcRenderer.invoke(SERVER_DELETED),
    logout: async () => {
        await ipcRenderer.invoke(RESET_AUTH);
        ipcRenderer.send(UPDATE_TEAMS, [{
            name: '.',
            url: IKOrigin,
            order: 0,
            tabs: [{name: 'TAB_MESSAGING', order: 0, isOpen: true}],
        }]);
        ipcRenderer.send(RELOAD_CURRENT_VIEW);
    },
});

contextBridge.exposeInMainWorld('callManager', {
    onCallJoined: (callback: (...any: unknown[]) => void) => ipcRenderer.on(CALL_JOINED, callback),
    onCallDeclined: (callback: (...any: unknown[]) => void) => ipcRenderer.on(CALL_DECLINED, callback),
    onCallEnded: (callback: (...any: unknown[]) => void) => ipcRenderer.on(CALL_ENDED, callback),
    onCallCancel: (callback: (...any: unknown[]) => void) => ipcRenderer.on(CALL_CANCEL, callback),
});

// Specific info for the testing environment
if (process.env.NODE_ENV === 'test') {
    contextBridge.exposeInMainWorld('testHelper', {
        getViewInfoForTest: () => ipcRenderer.invoke(GET_VIEW_INFO_FOR_TEST),
    });
}

/****************************************************************************
 * window/document listeners
 * These are here to perform specific tasks when global window or document events happen
 * Avoid using these unless absolutely necessary
 ****************************************************************************
 */

// Let the main process know when the window has finished resizing
// This is to reduce the amount of white box that happens when expand the BrowserView
window.addEventListener('resize', () => {
    ipcRenderer.send(VIEW_FINISHED_RESIZING);
});

// Enable secure input on macOS clients when the user is on a password input
let isPasswordBox = false;
const shouldSecureInput = (element: {tagName?: string; type?: string} | null, force = false) => {
    const targetIsPasswordBox = (element && element.tagName === 'INPUT' && element.type === 'password');
    if (targetIsPasswordBox && (!isPasswordBox || force)) {
        ipcRenderer.send(TOGGLE_SECURE_INPUT, true);
    } else if (!targetIsPasswordBox && (isPasswordBox || force)) {
        ipcRenderer.send(TOGGLE_SECURE_INPUT, false);
    }

    isPasswordBox = Boolean(targetIsPasswordBox);
};
window.addEventListener('focusin', (event) => {
    shouldSecureInput(event.target as Element);
});
window.addEventListener('focus', () => {
    shouldSecureInput(document.activeElement, true);
});

// exit fullscreen embedded elements like youtube - https://mattermost.atlassian.net/browse/MM-19226
ipcRenderer.on('exit-fullscreen', () => {
    if (document.fullscreenElement && document.fullscreenElement.nodeName.toLowerCase() === 'iframe') {
        document.exitFullscreen();
    }
});

// mattermost-webapp is SPA. So cache is not cleared due to no navigation.
// We needed to manually clear cache to free memory in long-term-use.
// http://seenaburns.com/debugging-electron-memory-usage/
const CLEAR_CACHE_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours
setInterval(() => {
    webFrame.clearCache();
}, CLEAR_CACHE_INTERVAL);

/****************************************************************************
 * LEGACY CODE BELOW
 * All of this code is deprecated and should be removed eventually
 * Current it is there to support older versions of the web app
 ****************************************************************************
 */

/**
 * Legacy helper functions
 */

const onLoad = () => {
    if (document.getElementById('root') === null) {
        console.warn('The guest is not assumed as mattermost-webapp');
        return;
    }
    watchReactAppUntilInitialized(() => {
        console.warn('Legacy preload initialized');
        ipcRenderer.send(REACT_APP_INITIALIZED);
        ipcRenderer.invoke(REQUEST_BROWSER_HISTORY_STATUS).then(sendHistoryButtonReturn);
    });
};

const onStorageChanged = (e: StorageEvent) => {
    if (e.key === '__login__' && e.storageArea === localStorage && e.newValue) {
        ipcRenderer.send(APP_LOGGED_IN);
    }
    if (e.key === '__logout__' && e.storageArea === localStorage && e.newValue) {
        ipcRenderer.send(APP_LOGGED_OUT);
    }
};

const isReactAppInitialized = () => {
    const initializedRoot =
    document.querySelector('#root.channel-view') || // React 16 webapp
    document.querySelector('#root .signup-team__container') || // React 16 login
    document.querySelector('div[data-reactroot]'); // Older React apps
    if (initializedRoot === null) {
        return false;
    }
    return initializedRoot.children.length !== 0;
};

const watchReactAppUntilInitialized = (callback: () => void) => {
    let count = 0;
    const interval = 500;
    const timeout = 30000;
    const timer = setInterval(() => {
        count += interval;
        if (isReactAppInitialized() || count >= timeout) { // assumed as webapp has been initialized.
            clearTimeout(timer);
            callback();
        }
    }, interval);
};

const checkUnread = () => {
    if (isReactAppInitialized()) {
        findUnread();
    } else {
        watchReactAppUntilInitialized(() => {
            findUnread();
        });
    }
};

const findUnread = () => {
    const classes = ['team-container unread', 'SidebarChannel unread', 'sidebar-item unread-title'];
    const isUnread = classes.some((classPair) => {
        const result = document.getElementsByClassName(classPair);
        return result && result.length > 0;
    });
    ipcRenderer.send(UNREAD_RESULT, isUnread);
};

let sessionExpired: boolean;
const getUnreadCount = () => {
    // LHS not found => Log out => Count should be 0, but session may be expired.
    let isExpired;
    if (document.getElementById('sidebar-left') === null) {
        const extraParam = (new URLSearchParams(window.location.search)).get('extra');
        isExpired = extraParam === 'expired';
    } else {
        isExpired = false;
    }
    if (isExpired !== sessionExpired) {
        sessionExpired = isExpired;
        ipcRenderer.send(SESSION_EXPIRED, sessionExpired);
    }
};

/**
 * Legacy message passing code - can be running alongside the new API stuff
 */

// Disabling no-explicit-any for this legacy code
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.addEventListener('message', ({origin, data = {}}: {origin?: string; data?: {type?: string; message?: any}} = {}) => {
    const {type, message = {}} = data;
    if (origin !== window.location.origin) {
        return;
    }
    switch (type) {
    case 'webapp-ready':
    case 'get-app-version': {
        // register with the webapp to enable custom integration functionality
        ipcRenderer.invoke(GET_APP_INFO).then((info) => {
            ipcRenderer.invoke(GET_APP_THEME).then((theme) => {
                console.log(`registering ${info.name} v${info.version} with the server`);
                window.postMessage(
                    {
                        type: 'register-desktop',
                        message: {
                            ...info,
                            theme,
                        },
                    },
                    window.location.origin || '*',
                );
            });
        });
        break;
    }
    case 'dispatch-notification': {
        const {title, body, channel, teamId, url, silent, data: messageData} = message;
        channels.set(channel.id, channel);
        ipcRenderer.invoke(NOTIFY_MENTION, title, body, channel.id, teamId, url, silent, messageData.soundName);
        break;
    }
    case BROWSER_HISTORY_PUSH: {
        const {path} = message as {path: string};
        ipcRenderer.send(BROWSER_HISTORY_PUSH, path);
        break;
    }
    case 'history-button': {
        ipcRenderer.invoke(REQUEST_BROWSER_HISTORY_STATUS).then(sendHistoryButtonReturn);
        break;
    }
    case CALLS_LINK_CLICK: {
        ipcRenderer.send(CALLS_LINK_CLICK, message.link);
        break;
    }
    case GET_DESKTOP_SOURCES: {
        ipcRenderer.invoke(GET_DESKTOP_SOURCES, message).then(sendDesktopSourcesResult);
        break;
    }
    case CALL_DIALING: {
        ipcRenderer.send(CALL_RINGING, message);
        break;
    }
    case TOKEN_REFRESHED: {
        ipcRenderer.send(TOKEN_REFRESHED, message);
        break;
    }
    case 'call-focus': {
        ipcRenderer.send('call-focus', message);
        break;
    }
    case 'reset-teams': {
        ipcRenderer.send(UPDATE_TEAMS, [{
            name: '.',
            url: IKOrigin,
            order: 0,
            tabs: [{name: 'TAB_MESSAGING', order: 0, isOpen: true}],
        }]);
        break;
    }
    case UPDATE_TEAMS: {
        const teams = message.teams.reduce((acc, item, idx) => {
            acc.push({
                name: item.display_name,
                url: item.url,
                order: idx,
                tabs: [{name: 'TAB_MESSAGING', order: 0, isOpen: true}],
                teamInfo: item,
            });

            return acc;
        }, []);

        if (teams.length) {
            ipcRenderer.send(UPDATE_TEAMS, teams);
        } else {
            ipcRenderer.send(UPDATE_TEAMS, []);
        }
        break;
    }
    case USER_LOCALE:
        ipcRenderer.send(USER_LOCALE, data.data);
        break;
    case SWITCH_SERVER:
        ipcRenderer.send(SWITCH_SERVER, data.data);
        break;
    case TEAMS_ORDER_PREFERENCE:
        ipcRenderer.send(TEAMS_ORDER_PREFERENCE, data.data);
        break;
    case PREFERRED_THEME:
        ipcRenderer.send(PREFERRED_THEME, data.data);
        break;
    case CALLS_WIDGET_SHARE_SCREEN: {
        ipcRenderer.send(CALLS_WIDGET_SHARE_SCREEN, message.sourceID, message.withAudio);
        break;
    }
    case CALLS_JOIN_CALL: {
        ipcRenderer.invoke(CALLS_JOIN_CALL, message).then(sendCallsJoinedCall);
        break;
    }
    case CALLS_JOINED_CALL: {
        ipcRenderer.send(CALLS_JOINED_CALL, message.callID, message.sessionID);
        break;
    }
    case CALLS_JOIN_REQUEST: {
        ipcRenderer.send(CALLS_JOIN_REQUEST, message.callID);
        break;
    }
    case CALLS_WIDGET_RESIZE: {
        ipcRenderer.send(CALLS_WIDGET_RESIZE, message.width, message.height);
        break;
    }
    case CALLS_ERROR: {
        ipcRenderer.send(CALLS_ERROR, message.err, message.callID, message.errMsg);
        break;
    }
    case CALLS_WIDGET_CHANNEL_LINK_CLICK:
    case CALLS_LEAVE_CALL:
    case DESKTOP_SOURCES_MODAL_REQUEST:
    case CALLS_POPOUT_FOCUS: {
        ipcRenderer.send(type);
        break;
    }
    case THEME_CHANGED: {
        ipcRenderer.send(THEME_CHANGED, message.callID, message);
        break;
    }
    }
});

// Legacy support to hold the full channel object so that it can be used for the click event
const channels: Map<string, {id: string}> = new Map();
ipcRenderer.on(NOTIFICATION_CLICKED, (event, channelId, teamId, url) => {
    const channel = channels.get(channelId) ?? {id: channelId};
    channels.delete(channelId);
    window.postMessage(
        {
            type: NOTIFICATION_CLICKED,
            message: {
                channel,
                teamId,
                url,
            },
        },
        window.location.origin,
    );
});

// Infomaniak Legacy calls-----------------------------------------------

ipcRenderer.on(CALL_CLOSED, (event, id) => {
    window.postMessage(
        {
            type: 'call-closed',
            message: {
                id,
            },
        },
        window.location.origin,
    );
});

ipcRenderer.on('call-audio-status-change', (event, status) => {
    window.postMessage(
        {
            type: 'call-audio-status-change',
            message: {
                status,
            },
        },
        window.location.origin,
    );
});

ipcRenderer.on('call-video-status-change', (event, status) => {
    window.postMessage(
        {
            type: 'call-video-status-change',
            message: {
                status,
            },
        },
        window.location.origin,
    );
});

ipcRenderer.on('call-ss-status-change', (event, status) => {
    window.postMessage(
        {
            type: 'call-ss-status-change',
            message: {
                status,
            },
        },
        window.location.origin,
    );
});

// ----------------------------------------------------------------------

ipcRenderer.on(BROWSER_HISTORY_PUSH, (event, pathName) => {
    window.postMessage(
        {
            type: 'browser-history-push-return',
            message: {
                pathName,
            },
        },
        window.location.origin,
    );
});

const sendHistoryButtonReturn = (status: {canGoBack: boolean; canGoForward: boolean}) => {
    window.postMessage(
        {
            type: 'history-button-return',
            message: {
                enableBack: status.canGoBack,
                enableForward: status.canGoForward,
            },
        },
        window.location.origin,
    );
};

ipcRenderer.on(BROWSER_HISTORY_STATUS_UPDATED, (event, canGoBack, canGoForward) => sendHistoryButtonReturn({canGoBack, canGoForward}));

const sendDesktopSourcesResult = (sources: Array<{
    id: string;
    name: string;
    thumbnailURL: string;
}>) => {
    window.postMessage(
        {
            type: DESKTOP_SOURCES_RESULT,
            message: sources,
        },
        window.location.origin,
    );
};

const sendCallsJoinedCall = (message: {callID: string; sessionID: string}) => {
    window.postMessage(
        {
            type: CALLS_JOINED_CALL,
            message,
        },
        window.location.origin,
    );
};

ipcRenderer.on(CALLS_JOIN_REQUEST, (_, callID) => {
    window.postMessage(
        {
            type: CALLS_JOIN_REQUEST,
            message: {callID},
        },
        window.location.origin,
    );
});

ipcRenderer.on(DESKTOP_SOURCES_MODAL_REQUEST, () => {
    window.postMessage(
        {
            type: DESKTOP_SOURCES_MODAL_REQUEST,
        },
        window.location.origin,
    );
});

ipcRenderer.on(CALLS_WIDGET_SHARE_SCREEN, (_, sourceID, withAudio) => {
    window.postMessage(
        {
            type: CALLS_WIDGET_SHARE_SCREEN,
            message: {sourceID, withAudio},
        },
        window.location.origin,
    );
});

ipcRenderer.on(CALLS_ERROR, (_, err, callID, errMsg) => {
    window.postMessage(
        {
            type: CALLS_ERROR,
            message: {err, callID, errMsg},
        },
        window.location.origin,
    );
});

ipcRenderer.on(THEME_CHANGED, (_, theme) => {
    window.postMessage(
        {
            type: 'theme-changed-global',
            theme,
        },
        window.location.origin,
    );
});

// push user activity updates to the webapp
ipcRenderer.on(USER_ACTIVITY_UPDATE, (event, userIsActive, isSystemEvent) => {
    if (window.location.origin !== 'null') {
        window.postMessage({type: USER_ACTIVITY_UPDATE, message: {userIsActive, manual: isSystemEvent}}, window.location.origin);
    }
});

ipcRenderer.on(TEAMS_ORDER_PREFERENCE_UPDATED, (_, teamsOrder) => {
    window.postMessage({type: TEAMS_ORDER_PREFERENCE_UPDATED, message: {teamsOrder}}, window.location.origin);
});

ipcRenderer.on(GET_SERVER_THEME, () => {
    window.postMessage({type: GET_SERVER_THEME, message: {}}, window.location.origin);
});

ipcRenderer.on(SWITCH_SERVER_SIDEBAR, (_, serverId) => {
    window.postMessage({type: SWITCH_SERVER_SIDEBAR, message: {serverId}}, window.location.origin);
});

/**
 * Legacy functionality that needs to be disabled with the new API
 */

let legacyEnabled = true;
ipcRenderer.on(IS_UNREAD, checkUnread);
const unreadInterval = setInterval(getUnreadCount, 1000);
window.addEventListener('storage', onStorageChanged);
window.addEventListener('load', onLoad);

function legacyOff() {
    ipcRenderer.send(LEGACY_OFF);
    ipcRenderer.off(IS_UNREAD, checkUnread);
    clearInterval(unreadInterval);
    window.removeEventListener('storage', onStorageChanged);
    window.removeEventListener('load', onLoad);

    legacyEnabled = false;
    console.log('New API preload initialized');
}
