/* eslint-disable header/header */

declare module '@infomaniak/jitsi-meet-electron-sdk' {
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
    export function setupScreenSharingMain(api: _JitsiMeetExternalAPI): void;
    export function cleanupAlwaysOnTopMain(api: _JitsiMeetExternalAPI): void;
    export function setupAlwaysOnTopRender(api: _JitsiMeetExternalAPI): void;
    export function setupAlwaysOnTopMain(api: _JitsiMeetExternalAPI): void;
    export function cleanupPowerMonitorMain(api: _JitsiMeetExternalAPI): void;
    export function setupPowerMonitorRender(api: _JitsiMeetExternalAPI): void;
    export function setupPowerMonitorMain(api: _JitsiMeetExternalAPI): void;

    export interface PopupsConfigRegistry {

        // Define the properties and methods of popupsConfigRegistry if available
    }

    export const popupsConfigRegistry: PopupsConfigRegistry;

    export function initPopupsConfigurationMain(api: _JitsiMeetExternalAPI): void;
    export function initPopupsConfigurationRender(api: _JitsiMeetExternalAPI): void;
    export function getPopupTarget(api: _JitsiMeetExternalAPI): void;
}
