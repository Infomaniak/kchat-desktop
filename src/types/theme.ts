// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
export type Theme = {
    [key: string]: string | undefined;
    sidebarBg: string;
    sidebarText: string;
    sidebarUnreadText: string;
    sidebarTextHoverBg: string;
    sidebarTextActiveBorder: string;
    sidebarTextActiveColor: string;
    sidebarHeaderBg: string;
    sidebarTeamBarBg: string;
    centerChannelBg: string;
    centerChannelColor: string;
};
