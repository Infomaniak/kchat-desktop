// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable max-lines */

import {Button} from 'react-bootstrap';
import React from 'react';

import {CALL_JOINED} from 'common/communication';

// import Avatar from './Avatar';

import {localizeMessage} from 'main/i18nManager';

import {playSoundLoop} from 'renderer/notificationSounds';

import Avatars from './Avatars/Avatars';

type State = {
    callInfo: {
        users: UserProfile[];
        channelID: string;
        userCalling: string;
        channel: any;
        url: string;
        username: string;
        avatar: string;
        id: string;
        nicknames: string;
        caller: UserProfile;
        currentUser: UserProfile;
    } | void;
    trad: string;
}
export type UserProfile = {
    id: string;
    user_id: number;
    username: string;
    email: string;
    nickname: string;
    first_name: string;
    last_name: string;
};
export default class DialingModal extends React.PureComponent<Record<string, never>, State> {
    // callInfo: any;

    constructor(props: Record<string, never>) {
        super(props);

        this.state = {
            callInfo: undefined,
            trad: '',
        };

        this.onHandleAccept = this.onHandleAccept.bind(this);
        this.onHandleDecline = this.onHandleDecline.bind(this);
    }

    componentDidMount() {
        window.ipcRenderer.on('info-received', (_, msg) => {
            // this.setState({callInfo: msg, trad: localizeMessage('Call.dialing', 'is Calling')});
            this.setState({callInfo: msg, trad: 'is Calling'});
        });

        playSoundLoop('Ring');
    }

    onHandleDecline() {
        const {callInfo} = this.state;

        window.ipcRenderer.send('decline-call', callInfo);
        window.close();
    }

    onHandleAccept() {
        const {callInfo} = this.state;

        window.ipcRenderer.send(CALL_JOINED, callInfo);
        window.close();
    }
    getUsersNicknames = (users: UserProfile[]): string => {
        const nicknames = users.map((user) => user.nickname);

        if (users.length > 2) {
            return [...nicknames.slice(0, 2), '...'].join(', ');
        }

        return nicknames.join(', ');
    };

    render() {
        const {callInfo} = this.state;

        // const trad = localizeMessage('label.ok', 'OK').toString();
        if (!callInfo) {
            return null;
        }
        return (
            <div className='container'>

                <div className='content-body'>
                    <Avatars
                        users={callInfo.users}
                        size='lg'
                        totalUsers={callInfo.users.length}

                    />

                </div>
                <div className='content-calling'>
                    <div className='content-calling-user'>
                        <span >{this.getUsersNicknames(callInfo.users)}</span>
                    </div>
                    <div className='content-calling-info'>
                        {this.state.trad}
                    </div>
                </div>
                <div className='actions'>
                    <Button
                        className='decline'
                        size='sm'
                        onClick={this.onHandleDecline}
                        variant='link'
                        style={{fontSize: 14}}
                    >
                        <span>{'Decline'}</span>
                    </Button>
                    <Button
                        className='accept'
                        size='sm'
                        onClick={this.onHandleAccept}
                        variant='link'
                        style={{fontSize: 14}}
                    >
                        <span>{'Accept'}</span>
                    </Button>
                </div>
            </div>
        );
    }
}
