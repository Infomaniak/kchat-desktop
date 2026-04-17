// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import 'renderer/css/components/HoveringURL.css';

import * as Sentry from '@sentry/electron/renderer';
import React from 'react';
import ReactDOM from 'react-dom';

import UrlDescription from '../../components/urlDescription';

Sentry.init({
    dsn: process.env.SENTRY_DSN,
});

const start = async () => {
    ReactDOM.render(
        <UrlDescription/>,
        document.getElementById('app'),
    );
};

start();
