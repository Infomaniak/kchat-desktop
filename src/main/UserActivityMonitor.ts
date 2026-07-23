// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {app, powerMonitor} from 'electron';
import {EventEmitter} from 'events';

import {Logger} from 'common/log';

const log = new Logger('UserActivityMonitor');

/**
 * Monitors system idle time, listens for system events and fires status updates as needed
 */
export class UserActivityMonitor extends EventEmitter {
    isActive: boolean;
    idleTime: number;
    lastSetActive?: number;
    systemIdleTimeIntervalID?: ReturnType<typeof setInterval>;
    private resumeGracePeriodId?: ReturnType<typeof setTimeout>;
    private systemForcedInactive: boolean;
    config: {
        updateFrequencyMs: number;
        inactiveThresholdMs: number;
        statusUpdateThresholdMs: number;
    };

    private startIdlePolling() {
        if (this.systemIdleTimeIntervalID) {
            return;
        }
        this.systemIdleTimeIntervalID = setInterval(() => {
            try {
                this.updateIdleTime(powerMonitor.getSystemIdleTime());
            } catch (err) {
                log.error('Error getting system idle time:', err);
            }
        }, this.config.updateFrequencyMs);
    }

    private stopIdlePolling() {
        if (this.systemIdleTimeIntervalID) {
            clearInterval(this.systemIdleTimeIntervalID);
            this.systemIdleTimeIntervalID = undefined;
        }
    }

    private handleUnlockScreen = () => {
        if (this.resumeGracePeriodId) {
            clearTimeout(this.resumeGracePeriodId);
            this.resumeGracePeriodId = undefined;
        }
        this.systemForcedInactive = false;
        delete this.lastSetActive;
        this.startIdlePolling();
    };

    private handleResume = () => {
        this.startIdlePolling();

        // After a grace period, clear the forced-inactive flag so systems
        // without a lock screen can transition back to online normally (Linux)
        if (this.resumeGracePeriodId) {
            clearTimeout(this.resumeGracePeriodId);
            this.resumeGracePeriodId = undefined;
        }

        this.resumeGracePeriodId = setTimeout(() => {
            this.systemForcedInactive = false;
            delete this.lastSetActive;
            this.resumeGracePeriodId = undefined;
        }, 5000);
    };

    private handleSystemInactive = () => {
        if (this.resumeGracePeriodId) {
            clearTimeout(this.resumeGracePeriodId);
            this.resumeGracePeriodId = undefined;
        }
        this.stopIdlePolling();
        this.systemForcedInactive = true;
        delete this.lastSetActive;
        this.setActivityState(false, true);
    };

    constructor() {
        super();

        this.isActive = true;
        this.idleTime = 0;
        this.systemForcedInactive = false;

        this.config = {
            updateFrequencyMs: 1 * 1000, // eslint-disable-line no-magic-numbers
            // 5 minutes — keep in sync with the backend away timeout
            inactiveThresholdMs: 5 * 60 * 1000, // eslint-disable-line no-magic-numbers
            statusUpdateThresholdMs: 60 * 1000, // eslint-disable-line no-magic-numbers
        };
    }

    get userIsActive() {
        return this.isActive;
    }

    get userIdleTime() {
        return this.idleTime;
    }

    /**
   * Begin monitoring system events and idle time at defined frequency
   *
   * @param {Object} config - overide internal configuration defaults
   * @param {number} config.updateFrequencyMs - internal update clock frequency for monitoring idleTime
   * @param {number} config.inactiveThresholdMs - the number of milliseconds that idleTime needs to reach to internally be considered inactive
   * @param {number} config.statusUpdateThresholdMs - minimum amount of time before sending a new status update
   * @emits {error} emitted when method is called before the app is ready
   * @emits {error} emitted when this method has previously been called but not subsequently stopped
   */
    startMonitoring(config = {}) {
        if (!app.isReady()) {
            this.emit('error', new Error('UserActivityMonitor.startMonitoring can only be called after app is ready'));
            return;
        }

        if (this.systemIdleTimeIntervalID) {
            this.emit('error', new Error('User activity monitoring is already in progress'));
            return;
        }

        this.config = Object.assign({}, this.config, config);

        powerMonitor.on('suspend', this.handleSystemInactive);
        powerMonitor.on('resume', this.handleResume);

        // only macOS Windows
        // https://www.electronjs.org/docs/latest/api/power-monitor
        powerMonitor.on('lock-screen', this.handleSystemInactive);
        powerMonitor.on('unlock-screen', this.handleUnlockScreen);

        this.startIdlePolling();
    }

    /**
   * Stop monitoring system events and idle time
   */
    stopMonitoring() {
        if (this.resumeGracePeriodId) {
            clearTimeout(this.resumeGracePeriodId);
            this.resumeGracePeriodId = undefined;
        }
        this.stopIdlePolling();
        powerMonitor.off('suspend', this.handleSystemInactive);
        powerMonitor.off('resume', this.handleResume);
        powerMonitor.off('lock-screen', this.handleSystemInactive);
        powerMonitor.off('unlock-screen', this.handleUnlockScreen);
    }

    /**
   * Updates internal idle time and sets internal user activity state
   *
   * @param {integer} idleTime
   * @private
   */
    updateIdleTime(idleTime: number) {
        this.idleTime = idleTime;
        if (idleTime * 1000 > this.config.inactiveThresholdMs) { // eslint-disable-line no-magic-numbers
            this.setActivityState(false);
        } else {
            this.setActivityState(true);
        }
    }

    /**
   * Updates user active state and conditionally triggers a status update
   *
   * @param {boolean} isActive
   * @param {boolean} isSystemEvent – indicates whether the update was triggered by a system event (log in/out, screesaver on/off etc)
   * @private
   */
    setActivityState(isActive = false, isSystemEvent = false) {
        if (!isSystemEvent && isActive && this.systemForcedInactive) {
            return;
        }

        this.isActive = isActive;

        if (isSystemEvent) {
            this.sendStatusUpdate(true);
            return;
        }

        const now = Date.now();

        if (isActive && (this.lastSetActive == null || now - this.lastSetActive >= this.config.statusUpdateThresholdMs)) {
            this.sendStatusUpdate(false);
            this.lastSetActive = now;
        } else if (!isActive && this.lastSetActive != null) {
            this.sendStatusUpdate(false);
            delete this.lastSetActive;
        }
    }

    /**
   * Sends an update with user activity status and current system idle time
   *
   * @emits {status} emitted at regular, definable intervals providing an update on user active status and idle time
   * @private
   */
    sendStatusUpdate(isSystemEvent = false) {
        this.emit('status', {
            userIsActive: this.isActive,
            idleTime: this.idleTime,
            isSystemEvent,
        });
    }
}

const userActivityMonitor = new UserActivityMonitor();
export default userActivityMonitor;
