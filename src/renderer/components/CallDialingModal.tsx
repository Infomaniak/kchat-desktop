// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable max-lines */

import {Button} from 'react-bootstrap';
import React from 'react';

import {CALL_JOINED} from 'common/communication';

import Avatar from './Avatar';

type State = {
    callInfo: {
        users: any[];
        channelID: string;
        userCalling: string;
        channel: any;
    } | void;
}

export default class DialingModal extends React.PureComponent<Record<string, never>, State> {
    // callInfo: any;

    constructor(props: Record<string, never>) {
        super(props);

        this.state = {
            callInfo: undefined,
        };

        this.onHandleAccept = this.onHandleAccept.bind(this);
        this.onHandleDecline = this.onHandleDecline.bind(this);
    }

    componentDidMount() {
        window.ipcRenderer.on('info-received', (_, msg) => {
            this.setState({callInfo: msg});
        });
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

    render() {
        const {callInfo} = this.state;

        if (!callInfo) {
            return null;
        }

        return (
            <div className='container'>
                <div className='avatars'>
                    {callInfo.users.map((user) => (
                        <Avatar
                            image={user.picture}
                            size='xl'
                            onClick={console.log}
                            key={user.id}
                            name={user.nickname}
                        />))}
                </div>
                <h6
                    style={{
                        alignSelf: 'center',
                        paddingTop: 10,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '200px',
                    }}
                >{callInfo.channel.display_name}</h6>
                <h6
                    className='grey'
                    style={{fontSize: 12}}
                >{'🎧 incoming call'}</h6>
                <div className='actions'>
                    <Button
                        className='decline'
                        size='lg'
                        onClick={this.onHandleDecline}
                        variant='link'
                        style={{fontSize: 14}}
                    >
                        <span>{'Decline'}</span>
                    </Button>
                    <Button
                        className='accept'
                        size='lg'
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
