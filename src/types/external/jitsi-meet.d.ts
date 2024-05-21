/* eslint-disable header/header */

import 'jitsi-meet';

declare module 'jitsi-meet' {
    interface ExternalAPIEventCallbacks {
        errorOccurred: (e: { error: Error & { isFatal?: boolean } }) => void;
    }

    interface JitsiMeetExternalAPI {
        executeCommand(command: 'setTileView', value: boolean): void;
    }
}

export as namespace Jitsi;
