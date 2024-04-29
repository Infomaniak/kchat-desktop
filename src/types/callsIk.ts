// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
type UserProfile = {
    nickname: string;
    [key: string]: any;
};

export type CallInfo = {
    users: UserProfile[];
    caller: UserProfile;
    channelId: string;
    url: string;
    avatar: string;
    id: string;
    nicknames: string;
    toneTimeOut: number;
}
