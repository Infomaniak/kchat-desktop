// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable max-lines */

import React from 'react';

import {FormattedMessage, IntlShape, injectIntl} from 'react-intl';

import {CallInfo, UserProfile} from 'types/callsIk';

import {playSoundLoop} from 'renderer/notificationSounds';

import Avatars from './Avatars/Avatars';
import {CallAccept, CallHangUp} from './icons';

type Props = Record<string, never> & {
    intl: IntlShape;
}

type State = {
    callInfo?: CallInfo;
    trad: string;
}

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
        this.onHandleCancel = this.onHandleCancel.bind(this);
    }

    componentDidMount() {
        window.dialApi.onInfo((_, msg) => {
            const isCurrentUserCaller = msg.caller.id === msg.currentUser.id;

            this.setState({callInfo: msg,
                trad: this.props.intl.formatMessage({
                    id: isCurrentUserCaller ? 'renderer.modals.call.waiting' : 'renderer.modals.call.calling',
                    defaultMessage: isCurrentUserCaller ? 'Waiting...' : 'Is calling',
                })});
        });

        playSoundLoop('Ring');

        setTimeout(() => {
            const {callInfo} = this.state;
            window.dialApi.callDeclined(callInfo);
        }, 30000);
    }

    componentWillUnmount(): void {
        const {callInfo} = this.state;
        window.dialApi.callDeclined(callInfo);
    }

    onHandleDecline() {
        const {callInfo} = this.state;
        window.dialApi.callDeclined(callInfo);
        window.close();
    }

    onHandleCancel() {
        const {callInfo} = this.state;
        window.dialApi.callCanceled(callInfo);
        window.close();
    }

    onHandleAccept() {
        const {callInfo} = this.state;
        window.dialApi.callAccept(callInfo);
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

        if (!callInfo) {
            return null;
        }

        const isCurrentUserCaller = callInfo.caller.id === callInfo.currentUser.id;

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
                    {isCurrentUserCaller && (
                        <button
                            className='cancel'
                            onClick={this.onHandleCancel}
                            style={{fontSize: 14}}
                        >
                            <CallHangUp/>
                            <span>
                                <FormattedMessage
                                    id='renderer.modals.call.cancel'
                                    defaultMessage='Cancel'
                                />
                            </span>
                        </button>
                    )}
                    {!isCurrentUserCaller && <>
                        <button
                            className='decline'
                            onClick={this.onHandleDecline}
                            style={{fontSize: 14}}
                        >
                            <CallHangUp/>
                            <span>
                                <FormattedMessage
                                    id='renderer.modals.call.decline'
                                    defaultMessage='Decline'
                                />
                            </span>
                        </button>
                        <button
                            className='accept'
                            onClick={this.onHandleAccept}
                            style={{fontSize: 14}}
                        >
                            <CallAccept/>
                            <span>
                                <FormattedMessage
                                    id='renderer.modals.call.accept'
                                    defaultMessage='Accept'
                                />
                            </span>
                        </button>
                    </>}
                </div>
            </div>
        );
    }
}

export default injectIntl(DialingModal);
