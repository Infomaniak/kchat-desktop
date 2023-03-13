// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import 'renderer/css/components/HoveringURL.css';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

import React from 'react';
import ReactDOM from 'react-dom';

import * as Sentry from '@sentry/electron/renderer';

import UrlDescription from '../../components/urlDescription';

Sentry.init({
    dsn: 'https://8a8c0ed6e4fe45eaa3f1a26bbe037a27@sentry.infomaniak.com/53',
});

const start = async () => {
    ReactDOM.render(
        <UrlDescription
            url={decodeURIComponent(urlParams.get('url')!)}
        />,
        document.getElementById('app'),
    );
};

start();
