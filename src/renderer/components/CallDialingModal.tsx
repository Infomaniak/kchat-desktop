// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable max-lines */

import { Button } from 'react-bootstrap';
import React from 'react';

import { CALLS_JOINED_CALL, CALL_DECLINED, CALL_JOINED } from 'common/communication';

import { playSoundLoop } from 'renderer/notificationSounds';

import Avatars from './Avatars/Avatars';
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl';

type Props = Record<string, never> & {
    intl: IntlShape
}

type State = {
    callInfo: {
        users: UserProfile[];
        channelID: string;
        url: string;
        avatar: string;
        id: string;
        nicknames: string;
        toneTimeOut: number;
    } | void;
    trad: string;
}
export type UserProfile = {
    nickname: string;
};
class DialingModal extends React.PureComponent<Props, State> {
    // callInfo: any;
    constructor(props: Props) {
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
            this.setState({ callInfo: msg, trad: this.props.intl.formatMessage({
                id: 'renderer.modals.call.calling',
                defaultMessage: 'Is calling'
            }) });
        });
        playSoundLoop('Ring');
        setTimeout(() => {
            window.ipcRenderer.send(CALLS_JOINED_CALL);
        }, 30000);
    }

    onHandleDecline() {
        const { callInfo } = this.state;
        window.ipcRenderer.send(CALL_DECLINED, callInfo);
        window.close();
    }

    onHandleAccept() {
        const { callInfo } = this.state;
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
        const { callInfo } = this.state;

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
                        variant='danger'
                        style={{ fontSize: 14 }}
                    >
                        <span>
                            <FormattedMessage
                                id="renderer.modals.call.decline"
                                defaultMessage="Decline"
                            />
                        </span>
                    </Button>
                    <Button
                        className='accept'
                        size='sm'
                        onClick={this.onHandleAccept}
                        variant='primary'
                        style={{ fontSize: 14 }}
                    >
                        <span>
                            <FormattedMessage
                                id="renderer.modals.call.accept"
                                defaultMessage="Accept"
                            />
                        </span>
                    </Button>
                </div>
            </div>
        );
    }
}

export default injectIntl(DialingModal)
