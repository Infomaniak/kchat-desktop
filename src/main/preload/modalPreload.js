// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// Copyright (c) 2015-2016 Yuya Ochiai

'use strict';

import {ipcRenderer} from 'electron';

import {
    MODAL_CANCEL,
    MODAL_RESULT,
    MODAL_INFO,
    RETRIEVE_MODAL_INFO,
    MODAL_SEND_IPC_MESSAGE,
    GET_DARK_MODE,
    DARK_MODE_CHANGE,
    GET_MODAL_UNCLOSEABLE,
    MODAL_UNCLOSEABLE,
    PING_DOMAIN,
    PING_DOMAIN_RESPONSE,
    GET_LANGUAGE_INFORMATION,
    RETRIEVED_LANGUAGE_INFORMATION,
    RESET_AUTH,
    RESET_TEAMS,

    // UPDATE_TEAMS,
} from 'common/communication';

console.log('preloaded for the modal!');

let uncloseable = false;
const createKeyDownListener = () => {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !uncloseable) {
            ipcRenderer.send(MODAL_CANCEL);
        }
    });
};

window.addEventListener('message', async (event) => {
    switch (event.data.type) {
    case MODAL_CANCEL: {
        console.log('canceling modal');
        ipcRenderer.send(MODAL_CANCEL, event.data.data);
        break;
    }
    case MODAL_RESULT: {
        console.log(`accepting modal with ${event.data.data}`);
        ipcRenderer.send(MODAL_RESULT, event.data.data);
        break;
    }
    case RETRIEVE_MODAL_INFO:
        console.log('getting modal data');
        window.postMessage({type: MODAL_INFO, data: await ipcRenderer.invoke(RETRIEVE_MODAL_INFO)}, window.location.href);
        break;
    case GET_MODAL_UNCLOSEABLE:
        console.log('get modal uncloseable');
        uncloseable = await ipcRenderer.invoke(GET_MODAL_UNCLOSEABLE);
        createKeyDownListener();
        window.postMessage({type: MODAL_UNCLOSEABLE, data: uncloseable}, window.location.href);
        break;
    case MODAL_SEND_IPC_MESSAGE:
        console.log('sending custom ipc message');
        ipcRenderer.send(event.data.data.type, ...event.data.data.args);
        break;
    case GET_DARK_MODE:
        console.log('getting dark mode value');
        window.postMessage({type: DARK_MODE_CHANGE, data: await ipcRenderer.invoke(GET_DARK_MODE)}, window.location.href);
        break;
    case PING_DOMAIN:
        console.log('pinging domain: ' + event.data.data);
        try {
            const protocol = await ipcRenderer.invoke(PING_DOMAIN, event.data.data);
            window.postMessage({type: PING_DOMAIN_RESPONSE, data: protocol}, window.location.href);
        } catch (error) {
            window.postMessage({type: PING_DOMAIN_RESPONSE, data: error}, window.location.href);
        }
        break;
    case GET_LANGUAGE_INFORMATION:
        window.postMessage({type: RETRIEVED_LANGUAGE_INFORMATION, data: await ipcRenderer.invoke(GET_LANGUAGE_INFORMATION)});
        break;
    case RESET_AUTH:
        await ipcRenderer.invoke(RESET_AUTH);
        ipcRenderer.invoke(RESET_TEAMS);
        ipcRenderer.send(MODAL_CANCEL, {});
        break;
    default:
        console.log(`got a message: ${event}`);
        console.log(event);
    }
});

createKeyDownListener();

ipcRenderer.on(DARK_MODE_CHANGE, (event, darkMode) => {
    window.postMessage({type: DARK_MODE_CHANGE, data: darkMode}, window.location.href);
});
