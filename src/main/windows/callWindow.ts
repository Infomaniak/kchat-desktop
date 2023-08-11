// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {BrowserWindow} from 'electron';


import Config from 'common/config';

let callWindow: BrowserWindow | null = null;

export function createCallWindow(mainWindow: BrowserWindow, withDevTools: boolean) {
    // const preload = getLocalPreload('call.js');
    const spellcheck = (typeof Config.useSpellChecker === 'undefined' ? true : Config.useSpellChecker);

    callWindow = new BrowserWindow({
        width: 1100,
        height: 800,
        fullscreen: false,
        title: 'kChat',
        webPreferences: {
            spellcheck,
            enableBlinkFeatures: 'RTCInsertableStreams,WebAssemblySimd',
            partition: 'persist:main',
            nodeIntegration: true,
            devTools: withDevTools,

        }});
    return callWindow;
}

/**
 * Handler for application protocol links to initiate a conference.
 */
// function handleProtocolCall(fullProtocolCall: string | void) {
//     try {
//         // eslint-disable-next-line no-console
//         console.log(`handle protocol call with ${fullProtocolCall}, app is ready ${app.isReady()} and mainWindow exists ${Boolean(mainWindow)}`);
//     } catch (e) {
//         // eslint-disable-next-line no-console
//         console.log(`handle protocol call error ${JSON.stringify(e)}`);
//     }
// '';

//     // don't touch when something is bad
//     if (
//         !fullProtocolCall ||
//         fullProtocolCall.trim() === '' ||
//         fullProtocolCall.indexOf(appProtocolSurplus) !== 0
//     ) {
//         return;
//     }

//     const inputURL = fullProtocolCall.replace(appProtocolSurplus, '');

//     // protocolDataForFrontApp = inputURL;

//     if (rendererReady) {
//         (callWindow as BrowserWindow).
//             webContents.
//             send('protocol-data-msg', inputURL);
//     }
// }
