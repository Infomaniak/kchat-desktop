// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React, {memo} from 'react';

import Avatar from '../Avatar/Avatar';

const OTHERS_DISPLAY_LIMIT = 99;

function countMeta<T>(
    items: T[],
    total = items.length,
): [T[], T[], { overflowUnnamedCount: number; nonDisplayCount: number }] {
    const breakAt = Math.max(items.length, total) > 2 ? 2 : 4;

    const displayItems = items.slice(0, breakAt);
    const overflowItems = items.slice(breakAt);

    const overflowUnnamedCount = Math.max(total - displayItems.length - overflowItems.length, 0);
    const nonDisplayCount = overflowItems.length + overflowUnnamedCount;

    return [displayItems, overflowItems, {overflowUnnamedCount, nonDisplayCount}];
}

type Props = {
    users: { [user_id: string]: any };
    size?: 'md' | 'xxs' | 'xs' | 'sm' | 'lg' | 'xl' | 'xxl';
};

function Avatars({
    size,
    users,
}: Props) {
    const [displayUserIds, , {nonDisplayCount}] = countMeta(Object.keys(users), Object.keys(users).length);
    return (
        <div
            className='avatars'
        >
            {displayUserIds.map((id) => (
                <Avatar
                    key={id}
                    name={users[id].nickname}
                    size={size}
                    image={users[id].avatar}
                />
            ))}
            {Boolean(nonDisplayCount) && (
                <Avatar
                    size={size}
                    name={nonDisplayCount > OTHERS_DISPLAY_LIMIT ? `${OTHERS_DISPLAY_LIMIT}+` : `+${nonDisplayCount}`}
                />
            )}
        </div>
    );
}

export default memo(Avatars);
