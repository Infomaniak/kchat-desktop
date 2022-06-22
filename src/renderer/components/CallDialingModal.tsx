// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable max-lines */

import {Button} from 'react-bootstrap';
import React from 'react';

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
    }

    componentDidMount() {
        window.ipcRenderer.on('info-received', (_, msg) => {
            this.setState({callInfo: msg});
        });
    }

    onHandleDecline() {
        console.log('decline');
    }

    onHandleAccept() {
        console.log('accept');
    }

    render() {
        const {callInfo} = this.state;

        if (!callInfo) {
            return null;
        }
        console.log(callInfo);

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
                        paddingTop: '10px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '200px',
                    }}
                >{callInfo.channel.display_name}</h6>
                <div className='actions'>
                    <Button
                        className='decline'
                        size='lg'
                        onClick={this.onHandleDecline}
                        variant='link'
                    >
                        <span style={{fontSize: 16}}>{'Decline'}</span>
                    </Button>
                    <Button
                        className='accept'
                        size='lg'
                        onClick={this.onHandleAccept}
                        variant='link'
                    >
                        <span style={{fontSize: 16}}>{'Accept'}</span>
                    </Button>
                </div>
            </div>
        );
    }
}
