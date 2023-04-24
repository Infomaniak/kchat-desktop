// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import {TeamWithIndex} from 'types/config';
import {ModalMessage} from 'types/modals';

import {
    GET_MODAL_UNCLOSEABLE,
    GET_DARK_MODE,
    DARK_MODE_CHANGE,
    RESET_AUTH,
} from 'common/communication';
import IntlProvider from 'renderer/intl_provider';
import WelcomeScreen from '../../components/WelcomeScreen';

import 'bootstrap/dist/css/bootstrap.min.css';

const MOBILE_SCREEN_WIDTH = 1200;

const WelcomeScreenModalWrapper = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [mobileView, setMobileView] = useState(false);

    const handleWindowResize = () => {
        setMobileView(window.innerWidth < MOBILE_SCREEN_WIDTH);
    };

    useEffect(() => {
        window.postMessage({type: GET_MODAL_UNCLOSEABLE}, window.location.href);
        window.postMessage({type: GET_DARK_MODE}, window.location.href);

        handleWindowResize();

        window.addEventListener('resize', handleWindowResize);
        window.addEventListener('message', handleMessageEvent);

        return () => {
            window.removeEventListener('message', handleMessageEvent);
        };
    }, []);

    const handleMessageEvent = (event: {data: ModalMessage<boolean | Electron.Rectangle | TeamWithIndex[]>}) => {
        switch (event.data.type) {
        case DARK_MODE_CHANGE:
            setDarkMode(event.data.data as boolean);
            break;
        default:
            break;
        }
    };

    const onGetStarted = () => {
        window.postMessage({type: RESET_AUTH}, window.location.href);
    };

    return (
        <IntlProvider>
            <WelcomeScreen
                darkMode={darkMode}
                onGetStarted={onGetStarted}
            />
        </IntlProvider>
    );
};

const start = () => {
    ReactDOM.render(
        <WelcomeScreenModalWrapper/>,
        document.getElementById('app'),
    );
};

start();
