/* eslint-disable header/header */

declare module '@infomaniak/jitsi-meet-electron-sdk' {
    import type {BrowserWindow} from 'electron';
    import type {_JitsiMeetExternalAPI} from 'jitsi-meet';

    export class RemoteControl {
        constructor(api: _JitsiMeetExternalAPI);
    }

    export class RemoteControlMain {
        constructor(api: _JitsiMeetExternalAPI);
    }

    export class RemoteDraw {
        constructor(api: _JitsiMeetExternalAPI);
    }

    export class RemoteDrawMain {
        constructor(api: _JitsiMeetExternalAPI);
    }

    export function setupScreenSharingRender(api: _JitsiMeetExternalAPI): void;
    export function setupScreenSharingMain(window: BrowserWindow, appName: string, appId: string): void;
    export function cleanupAlwaysOnTopMain(api: _JitsiMeetExternalAPI): void;
    export function setupAlwaysOnTopRender(api: _JitsiMeetExternalAPI): void;
    export function setupAlwaysOnTopMain(window: BrowserWindow, _?: unknown, windowOpenHandler: ({url, frameName}: {url: string; frameName: string}) => void): void;
    export function cleanupPowerMonitorMain(window: BrowserWindow): void;
    export function setupPowerMonitorRender(api: _JitsiMeetExternalAPI): void;
    export function setupPowerMonitorMain(window: BrowserWindow): void;

    export interface PopupsConfigRegistry {

        // Define the properties and methods of popupsConfigRegistry if available
    }

    export const popupsConfigRegistry: PopupsConfigRegistry;

    export function initPopupsConfigurationMain(api: _JitsiMeetExternalAPI): void;
    export function initPopupsConfigurationRender(api: _JitsiMeetExternalAPI): void;
    export function getPopupTarget(api: _JitsiMeetExternalAPI): void;
}
