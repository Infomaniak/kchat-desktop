// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import 'renderer/css/components/HoveringURL.css';

import React from 'react';
import ReactDOM from 'react-dom';

import UrlDescription from '../../components/urlDescription';
import setupDarkMode from '../darkMode';

const start = async () => {
    setupDarkMode();
    ReactDOM.render(
        <UrlDescription/>,
        document.getElementById('app'),
    );
};

start();
