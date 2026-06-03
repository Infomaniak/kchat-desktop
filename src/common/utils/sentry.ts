// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {init} from '@sentry/electron/renderer';

export function initSentryRenderer() {
    if (!process.env.SENTRY_DSN) {
        return;
    }

    init({
        dsn: process.env.SENTRY_DSN,
    });
}
