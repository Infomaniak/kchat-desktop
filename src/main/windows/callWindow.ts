// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {BrowserWindow, ipcMain} from 'electron';
import log from 'electron-log';

import Config from 'common/config';

import ContextMenu from '../contextMenu';
import {getLocalPreload, getLocalURLString} from '../utils';
import {CALL_CLOSED, CALL_COMMAND} from 'common/communication';
import {JitsiMeetExternalAPI} from 'renderer/external_api';

let callWindow: BrowserWindow | null = null;

/**
 * Add protocol data
 */
const appProtocolSurplus = 'kchat://';
const rendererReady = false;

// let protocolDataForFrontApp = null;

export function createCallWindow(mainWindow: BrowserWindow, withDevTools: boolean, id: string, url: string, name: string, avatar: string, username: string) {
    // const preload = getLocalPreload('call.js');
    const spellcheck = (typeof Config.useSpellChecker === 'undefined' ? true : Config.useSpellChecker);
    
    callWindow = new BrowserWindow({
        width: 1100,
        height: 800,

        // parent: mainWindow,
        title: name + '🔉',
        fullscreen: false,

        webPreferences: {

            // nativeWindowOpen: true,

            // preload,
            spellcheck,

            // contextIsolation: false,
            enableBlinkFeatures: 'RTCInsertableStreams,WebAssemblySimd',
            // enableRemoteModule: true,
            partition: 'persist:main',
            nodeIntegration: true,

        }});

    // const contextMenu = new ContextMenu({}, callWindow);
    // contextMenu.reload();

    // const localURL = getLocalURLString('call.html');
    // callWindow.setMenuBarVisibility(false);
    // callWindow.loadURL(localURL).catch(
    //     (reason) => {
    //         log.error(`Settings window failed to load: ${reason}`);
    //         log.info(process.env);
    //     });
    // callWindow.show();
    // callWindow.webContents.on('did-finish-load', () => {
    //     callWindow.webContents.send('jitsi-connect', {id, url, name, avatar, username});
    // });

    // ipcMain.on(CALL_COMMAND, (_, message: {command: string}) => {
    //     callWindow.webContents.send('call-command', {command: message.command});
    // });

    // ipcMain.on('call-audio-status-change', (_, message: {muted: boolean}) => {
    //     mainWindow.webContents.send('call-audio-status-change', message.muted);
    // });

    // ipcMain.on('call-video-status-change', (_, message: {muted: boolean}) => {
    //     mainWindow.webContents.send('call-video-status-change', message.muted);
    // });

    // ipcMain.on('call-ss-status-change', (_, message: {on: boolean}) => {
    //     mainWindow.webContents.send('call-ss-status-change', message.on);
    // });

    // callWindow.on('close', () => {
    //     mainWindow.webContents.send(CALL_CLOSED, id);
    // });

    // if (withDevTools) {
    //     callWindow.webContents.openDevTools({mode: 'detach'});
    // }

    /**
     * When someone tries to enter something like jitsi-meet://test
     *  while app is closed
     * it will trigger this event below
     */
    // handleProtocolCall(process.argv.pop());

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
