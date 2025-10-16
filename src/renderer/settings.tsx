// Copyright (c) 2015-2016 Yuya Ochiai
// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import 'bootstrap/dist/css/bootstrap.min.css';
import 'renderer/css/index.css';
import 'renderer/css/settings.css';

import * as Sentry from '@sentry/electron/renderer';
import React from 'react';
import ReactDOM from 'react-dom';

import darkStyles from 'renderer/css/lazy/settings-dark.lazy.css';

import SettingsPage from './components/SettingsPage';
import IntlProvider from './intl_provider';

Sentry.init({
    dsn: 'https://bafc5cd5580a437a9bfd407e8d5f69bf@sentry-kchat.infomaniak.com/5',
});

const setDarkMode = (darkMode: boolean) => {
    if (darkMode) {
        darkStyles.use();
    } else {
        darkStyles.unuse();
    }
};

window.desktop.onDarkModeChange((darkMode) => setDarkMode(darkMode));
window.desktop.getDarkMode().then(setDarkMode);

const start = async () => {
    ReactDOM.render(
        (
            <IntlProvider>
                <SettingsPage/>
            </IntlProvider>
        )
        ,
        document.getElementById('app'),
    );
};

// Deny drag&drop navigation in mainWindow.
document.addEventListener('dragover', (event) => event.preventDefault());
document.addEventListener('drop', (event) => event.preventDefault());

start();
