// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import classNames from 'classnames';
import React from 'react';

import '../../css/components/Avatar.scss';

import {
    AVATAR_ELEMENTS,
    AVATAR_SIZE_MAP,
    AVATAR_SIZES,
    DEFAULT_AVATAR_ELEMENT,
    DEFAULT_AVATAR_SIZE,
    DEFAULT_AVATAR_VARIANT,
    AVATAR_FALLBACK_COLORS,
} from './Avatar.constants';
import type PAvatar from './Avatar.props';

const Avatar = (props: PAvatar): JSX.Element => {
    const {
        element = DEFAULT_AVATAR_ELEMENT,
        size = DEFAULT_AVATAR_SIZE,
        variant = DEFAULT_AVATAR_VARIANT,
        disableHover = false,
        isActive = false,
        onClick,
        name,
        image,
        status,
        ...rest
    } = props;

    if (!AVATAR_ELEMENTS.includes(element)) {
        console.warn(
            `Avatar: component was used with an unsupported element '${element}'.
                    Please provide one from these available options: ${AVATAR_ELEMENTS.join(', ')}.`,
        );
    }

    // correctness of index is guaranteed by using a tuple for AVATAR_SIZES
    // - `MentionBadges` are best to be used at size `md` or above (`sm` is the smallest supported size)
    // - `StatusBadges` are usable on nearly all sizes (except for `xxs` and `xxxs`)
    const sizeIndex = AVATAR_SIZES.indexOf(size);

    const rootProperties = {
        size,
        variant,
        onClick,
        disableHover,
        isActive,
        ...rest,
    };

    // const sizeVal = AVATAR_SIZE_MAP[size].status.size || DEFAULT_AVATAR_SIZE;
    const offsetVal = AVATAR_SIZE_MAP[size].status.offset;

    const childStyle = {
        display: 'flex',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        width: AVATAR_SIZE_MAP[size].size,
        height: AVATAR_SIZE_MAP[size].size,
        borderRadius: '50%',
        border: 'solid',
    };

    return (
        <div
            className={classNames('AvatarRoot')}
            {...rootProperties}
        >
            {image ?
                <img
                    className={'StyledAvatarImage'}
                    src={image}
                    style={childStyle}
                />
                 : (
                    <div
                        style={{
                            backgroundColor: AVATAR_FALLBACK_COLORS[Math.floor(Math.random() * 8)],
                            ...childStyle,
                        }}
                    >
                        {name.toUpperCase().slice(0, 2)}
                    </div>
                )
            }
            {variant === 'circle' && sizeIndex > 0 && status && (
                <div className='AvatarStatusBadgeRoot'>
                    <div
                        className={classNames('glyph', 'circle-outline', 'StatusIcon', {
                            clock: status === 'away',
                            'minus-circle': status === 'dnd',
                            'check-circle': status === 'online',
                        })}
                        style={{
                            width: `${rootProperties.size}px`,
                            height: `${rootProperties.size}px`,
                            bottom: `${offsetVal}px`,
                            right: `${offsetVal}px`,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Avatar;
