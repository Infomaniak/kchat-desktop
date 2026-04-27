// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import 'renderer/css/components/HoveringURL.css';
import React from 'react';
import ReactDOM from 'react-dom';

import {initSentryRenderer} from 'common/utils/sentry';

import UrlDescription from '../../components/urlDescription';

initSentryRenderer();

const start = async () => {
    ReactDOM.render(
        <UrlDescription/>,
        document.getElementById('app'),
    );
};

start();
