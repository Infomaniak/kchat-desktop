// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// Copyright (c) 2015-2016

'use strict';

import {ipcRenderer, contextBridge} from 'electron';

import {CALLS_JOINED_CALL, CALL_CANCEL, CALL_DECLINED, CALL_DIAL_UPDATED, CALL_JOINED, GET_LANGUAGE_INFORMATION} from 'common/communication';

contextBridge.exposeInMainWorld('dialApi', {
    onInfo: (callback) => ipcRenderer.on('info-received', callback),
    callAccept: (callInfo) => ipcRenderer.send(CALL_JOINED, callInfo),
    callDeclined: (callInfo) => ipcRenderer.send(CALL_DECLINED, callInfo),
    callCanceled: (callInfo) => ipcRenderer.send(CALL_CANCEL, callInfo),
    callDefault: () => ipcRenderer.send(CALLS_JOINED_CALL),
    callUpdated: () => ipcRenderer.send(CALL_DIAL_UPDATED),
});

contextBridge.exposeInMainWorld('desktop', {
    getLanguageInformation: () => ipcRenderer.invoke(GET_LANGUAGE_INFORMATION),
});
