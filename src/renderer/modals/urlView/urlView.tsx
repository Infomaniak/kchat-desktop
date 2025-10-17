// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import 'renderer/css/components/HoveringURL.css';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

import * as Sentry from '@sentry/electron/renderer';
import React from 'react';
import ReactDOM from 'react-dom';

import UrlDescription from '../../components/urlDescription';

Sentry.init({
    dsn: 'https://bafc5cd5580a437a9bfd407e8d5f69bf@sentry-kchat.infomaniak.com/5',
});

const start = async () => {
    ReactDOM.render(
        <UrlDescription/>,
        document.getElementById('app'),
    );
};

start();
