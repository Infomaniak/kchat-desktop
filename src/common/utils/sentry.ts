// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {init as initMain} from '@sentry/electron/main';
import {init as initRenderer} from '@sentry/electron/renderer';

const dsn: string | undefined = process.env.SENTRY_DSN;

export function initSentryMain() {
    if (global.isDev) {
        return;
    }

    initMain({
        dsn,
    });
}

export function initSentryRenderer() {
    if (global.isDev) {
        return;
    }

    initRenderer({
        dsn,
    });
}
