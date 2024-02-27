type UserProfile = {
    nickname: string;
};

export type CallInfo = {
    users: UserProfile[];
    channelID: string;
    url: string;
    avatar: string;
    id: string;
    nicknames: string;
    toneTimeOut: number;
}
