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
    totalUsers,
    fetchMissingUsers = false,
}: Props) {
    console.log(users, Object.keys(users));
    const [displayUserIds, _, {__, nonDisplayCount}] = countMeta(Object.keys(users), Object.keys(users).length);

    // const [overlayProps, setImmediate] = useSynchronizedImmediate();

    // const overflowNames = useSelector((state: GlobalState) => {
    //     return overflowUserIds.map((userId) => displayNameGetter(state, true)(selectUser(state, userId))).join(', ');
    // });

    // const {centerChannelBg, centerChannelColor} = useSelector(getTheme);

    // const avatarStyle: CSSProperties = useMemo(() => ({
    //     background: tinycolor.mix(centerChannelBg, centerChannelColor, 8).toRgbString(),
    // }), [centerChannelBg, centerChannelColor]);

    // useEffect(() => {
    //     if (fetchMissingUsers) {
    //         dispatch(getMissingProfilesByIds(userIds));
    //     }
    // }, [fetchMissingUsers, userIds]);

    return (
        <div
            className='avatars'
            onMouseLeave={() => setImmediate(false)}
        >
            {displayUserIds.map((id) => (
                <Avatar

                    // style={{background: '#FFF'}}
                    key={id}
                    name={users[id].nickname}
                    userId={id}
                    size={size}
                    tabIndex={0}
                    image={users[id].picture}
                />
            ))}
            {Boolean(nonDisplayCount) && (

            // <SimpleTooltip
            //     id={'names-overflow'}
            //     {...overlayProps}
            //     content={overflowUserIds.length ? formatMessage(
            //         {
            //             id: t('avatars.overflowUsers'),
            //             defaultMessage: '{overflowUnnamedCount, plural, =0 {{names}} =1 {{names} and one other} other {{names} and # others}}',
            //         },
            //         {
            //             overflowUnnamedCount,
            //             names: overflowNames,
            //         },
            //     ) : formatMessage(
            //         {
            //             id: t('avatars.overflowUnnamedOnly'),
            //             defaultMessage: '{overflowUnnamedCount, plural, =1 {one other} other {# others}}',
            //         },
            //         {overflowUnnamedCount},
            //     )}
            // >
            //     {/*  */}
            // </SimpleTooltip>

                <Avatar

                    // style={{background: '#FFF'}}
                    size={size}
                    tabIndex={0}
                    name={nonDisplayCount > OTHERS_DISPLAY_LIMIT ? `${OTHERS_DISPLAY_LIMIT}+` : `+${nonDisplayCount}`}
                />
            )}
        </div>
    );
}

export default memo(Avatars);
