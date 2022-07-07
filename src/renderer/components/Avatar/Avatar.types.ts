// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
type TComponentSizeToken = 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
type TComponentSizes = ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];
type TStatusBadgeStatus = 'online' | 'away' | 'dnd' | 'offline';

type TAvatarVariant = 'circle' | 'rounded';

type TAvatarElement = 'button' | 'div' | 'span';

export type {
    TAvatarVariant,
    TAvatarElement,
    TComponentSizes as TAvatarSizes,
    TComponentSizeToken as TAvatarSizeToken,
    TStatusBadgeStatus as TAvatarStatus,
};
