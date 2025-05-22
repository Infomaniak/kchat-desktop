// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import classNames from 'classnames';
import type {FC} from 'react';
import React, {useState} from 'react';
import {Draggable} from 'react-beautiful-dnd';

import type {Theme} from 'types/theme';

import ImageWithPlaceholder from './ImageWithPlaceholder';

type Props = {
    draggableId: string;
    sessionExpired?: boolean;
    hasUnreads: boolean;
    mentionCount?: number;
    orderedIndex: number;
    isActive: boolean;
    isAnyDragging: boolean;
    iconUrl: string | null;
    initial: string;
    theme?: Theme;
    showButtonsIndex: boolean;
    name: string;

    onClick?: () => void;
}

const ServerButton: FC<Props> = ({
    draggableId,
    sessionExpired,
    hasUnreads,
    mentionCount,
    orderedIndex,
    isActive,
    iconUrl,
    isAnyDragging,
    initial,
    showButtonsIndex,
    name,

    onClick,
}) => {
    let badgeDiv: React.ReactNode;

    if (sessionExpired) {
        badgeDiv = (
            <div className='ServerButton__badge-expired'>
                <i className='icon-alert-circle-outline'/>
            </div>
        );
    } else if (mentionCount && mentionCount > 0) {
        badgeDiv = (
            <div className='ServerButton__badge'>
                <span>{mentionCount > 99 ? '99+' : mentionCount}</span>
            </div>
        );
    } else if (hasUnreads) {
        badgeDiv = (
            <div className='ServerButton__unread'/>
        );
    }

    return (
        <Draggable
            draggableId={draggableId}
            index={orderedIndex}
            disableInteractiveElementBlocking={true}
        >
            {(provided, snapshot) => (
                <button
                    className={classNames('ServerButton', {
                        dragging: snapshot.isDragging,
                        anyDragging: isAnyDragging,
                        withImage: Boolean(iconUrl),
                        active: isActive,
                        hasMentions: mentionCount && mentionCount > 0,
                        showDot: showButtonsIndex,
                    })}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    data-index={orderedIndex + 1}
                    ref={provided.innerRef}
                    onClick={onClick}
                    onMouseEnter={() => window.desktop.serversSidebar.handleMouseInServerButton(orderedIndex + 1, name)}
                    onMouseOut={() => window.desktop.serversSidebar.handleMouseOutServerButton()}
                >
                    {badgeDiv}
                    <span className='ServerButton__content'>
                        <ImageWithPlaceholder
                            src={iconUrl}
                            alt={initial}
                            className='ServerButton__image'
                        />
                    </span>
                </button>
            )}
        </Draggable>
    );
};

export default ServerButton;
