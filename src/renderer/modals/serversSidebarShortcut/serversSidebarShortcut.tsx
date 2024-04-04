// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'renderer/css/modals.css';
import 'renderer/css/components/ServersSidebarModal.scss';

import {ServerSidebarModal} from './modal';

const start = async () => {
    ReactDOM.render(
        <ServerSidebarModal/>,
        document.getElementById('app'),
    );
};

start();
