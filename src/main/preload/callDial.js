// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// Copyright (c) 2015-2016 Yuya Ochiai
/* eslint-disable consistent-return */

'use strict';

// eslint-disable-next-line import/no-commonjs
const {ipcRenderer} = require('electron');

window.ipcRenderer = {
    send: ipcRenderer.send,
    on: (channel, listener) => ipcRenderer.on(channel, (_, ...args) => listener(null, ...args)),
    invoke: ipcRenderer.invoke,
};
