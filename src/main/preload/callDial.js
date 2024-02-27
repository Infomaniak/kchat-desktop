// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// Copyright (c) 2015-2016

'use strict';

import { CALLS_JOINED_CALL, CALL_DECLINED, CALL_JOINED, GET_LANGUAGE_INFORMATION } from 'common/communication';
import {ipcRenderer, contextBridge} from 'electron';

contextBridge.exposeInMainWorld('dialApi', {
    onInfo: (callback) => ipcRenderer.on('info-received', callback),
    callAccept: (callInfo) => ipcRenderer.send(CALL_JOINED, callInfo),
    callDeclined: (callInfo) => ipcRenderer.send(CALL_DECLINED, callInfo),
    callDefault: () => ipcRenderer.send(CALLS_JOINED_CALL),
})

contextBridge.exposeInMainWorld('desktop', {
    getLanguageInformation: () => ipcRenderer.invoke(GET_LANGUAGE_INFORMATION)
})
