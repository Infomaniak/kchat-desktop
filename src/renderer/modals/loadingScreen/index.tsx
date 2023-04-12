// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import ReactDOM from 'react-dom';

import {ModalMessage} from 'types/modals';

import * as Sentry from '@sentry/electron/renderer';

import {RECEIVED_LOADING_SCREEN_DATA, GET_LOADING_SCREEN_DATA, LOADING_SCREEN_ANIMATION_FINISHED, TOGGLE_LOADING_SCREEN_VISIBILITY} from 'common/communication';

import LoadingScreen from '../../components/LoadingScreen';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'renderer/css/modals.css';
import 'renderer/css/components/LoadingAnimation.css';
import 'renderer/css/components/LoadingScreen.css';

Sentry.init({
    dsn: 'https://bafc5cd5580a437a9bfd407e8d5f69bf@sentry-kchat.infomaniak.com/5',
});

type Props = Record<string, never>;

type State = {
    showLoadingScreen: boolean;
    darkMode: boolean;
}

class LoadingScreenRoot extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showLoadingScreen: true,
            darkMode: false,
        };
    }

    componentDidMount() {
        window.postMessage({type: GET_LOADING_SCREEN_DATA}, window.location.href);

        window.addEventListener('message', this.handleMessageEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.handleMessageEvent);
    }

    handleMessageEvent = (event: {data: ModalMessage<any>}) => {
        if (event.data.type === RECEIVED_LOADING_SCREEN_DATA) {
            this.setState({
                darkMode: event.data.data.darkMode,
            });
        }

        if (event.data.type === TOGGLE_LOADING_SCREEN_VISIBILITY) {
            this.setState({
                showLoadingScreen: event.data.data,
            });
        }
    }

    onFadeOutComplete = () => {
        window.postMessage({type: LOADING_SCREEN_ANIMATION_FINISHED}, window.location.href);
    }

    render() {
        return (
            <LoadingScreen
                loading={this.state.showLoadingScreen}
                darkMode={this.state.darkMode}
                onFadeOutComplete={this.onFadeOutComplete}
            />
        );
    }
}
const start = async () => {
    ReactDOM.render(
        <LoadingScreenRoot/>,
        document.getElementById('app'),
    );
};

start();
