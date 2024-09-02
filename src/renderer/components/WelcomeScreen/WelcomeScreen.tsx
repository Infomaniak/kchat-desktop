// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useState, useEffect} from 'react';
import {useIntl} from 'react-intl';
import classNames from 'classnames';

import chat2 from 'renderer/assets/svg/chat2.svg';
import Header from 'renderer/components/Header';
import LoadingBackground from 'renderer/components/LoadingScreen/LoadingBackground';

import WelcomeScreenSlide from './WelcomeScreenSlide';

import 'renderer/css/components/Button.scss';
import 'renderer/css/components/WelcomeScreen.scss';
import 'renderer/css/components/LoadingScreen.css';

type WelcomeScreenProps = {
    darkMode?: boolean;
    onGetStarted?: () => void;
};

function WelcomeScreen({
    darkMode = false,
    onGetStarted = () => null,
}: WelcomeScreenProps) {
    const {formatMessage} = useIntl();

    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setShowContent(true);

        // Let the main process know when the window has finished resizing
        // This is to reduce the amount of white box that happens when expand the BrowserView
        window.addEventListener('resize', () => {
            window.desktop.viewFinishedResizing();
        });
    }, []);

    const handleOnGetStartedClick = () => {
        onGetStarted();
    };

    return (
        <div
            className={classNames(
                'LoadingScreen',
                {'LoadingScreen--darkMode': darkMode},
                'WelcomeScreen',
            )}
        >
            <LoadingBackground/>
            <Header darkMode={darkMode}/>
            {showContent && (
                <div className='WelcomeScreen__body'>
                    <div className='WelcomeScreen__content'>
                        <WelcomeScreenSlide
                            key='welcome'
                            title={formatMessage({id: 'renderer.components.welcomeScreen.slides.welcome.title', defaultMessage: 'Welcome'})}
                            subtitle={formatMessage({
                                id: 'renderer.components.welcomeScreen.slides.welcome.message',
                                defaultMessage: 'You don’t have a kChat, discover it with kSuite',
                            })}
                            image={(
                                <img
                                    src={chat2}
                                    draggable={false}
                                />
                            )}
                            isMain={true}
                            darkMode={darkMode}
                        />

                        <button
                            id='getStartedWelcomeScreen'
                            className={classNames(
                                'WelcomeScreen__button',
                                'primary-button primary-medium-button',
                                {'primary-button-inverted': darkMode},
                            )}
                            onClick={handleOnGetStartedClick}
                        >
                            {formatMessage({id: 'renderer.components.welcomeScreen.button.login', defaultMessage: 'Get Started'})}
                        </button>
                    </div>
                </div>
            )}
            <div className='WelcomeScreen__footer'/>
        </div>
    );
}

export default WelcomeScreen;
