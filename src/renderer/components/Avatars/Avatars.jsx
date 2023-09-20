// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React, {memo} from 'react';

import Avatar from '../Avatar/Avatar';

const OTHERS_DISPLAY_LIMIT = 99;

function countMeta<T>(
    items: T[],
    total = items.length,
): [T[], T[], {overflowUnnamedCount: number; nonDisplayCount: number}] {
    const breakAt = Math.max(items.length, total) > 2 ? 2 : 4;

    const displayItems = items.slice(0, breakAt);
    const overflowItems = items.slice(breakAt);

    const overflowUnnamedCount = Math.max(total - displayItems.length - overflowItems.length, 0);
    const nonDisplayCount = overflowItems.length + overflowUnnamedCount;

    return [displayItems, overflowItems, {overflowUnnamedCount, nonDisplayCount}];
}

type Props = {
    users: {[user_id: string]: any};
    totalUsers?: number;
    breakAt?: number;
    size?: 'md' | 'xxs' | 'xs' | 'sm' | 'lg' | 'xl' | 'xxl';
    fetchMissingUsers?: boolean;
};

function Avatars({
    size,
    users,
}: Props) {
    console.log(users, Object.keys(users));
    const [displayUserIds,, {__, nonDisplayCount}] = countMeta(Object.keys(users), Object.keys(users).length);
    return (
        <div
            className='avatars'
            onMouseLeave={() => setImmediate(false)}
        >
            {displayUserIds.map((id) => (
                <Avatar
                    key={id}
                    name={users[id].nickname}
                    userId={id}
                    size={size}
                    tabIndex={0}
                    image={users[id].avatar}
                />
            ))}
            {Boolean(nonDisplayCount) && (
                <Avatar
                    size={size}
                    tabIndex={0}
                    name={nonDisplayCount > OTHERS_DISPLAY_LIMIT ? `${OTHERS_DISPLAY_LIMIT}+` : `+${nonDisplayCount}`}
                />
            )}
        </div>
    );
}

export default memo(Avatars);
