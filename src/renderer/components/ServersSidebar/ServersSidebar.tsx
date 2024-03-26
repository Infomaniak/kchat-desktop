// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, { FC } from 'react';

import '../../css/components/ServersSidebar.scss';
import classNames from 'classnames';
import ServerButton from './ServerButton';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import type { ServerTeam } from 'types/server';
import { applyCssVars, imageURLForTeam, initialForTeam } from './utils';
import { Theme } from 'types/theme';

type Server = {
    name: string
    id: string
    url: string
    isPredefined: boolean
    team?: ServerTeam
}

type Props = {
    servers: Server[],
    activeServerId?: string
    isAnyDragging: boolean

    unreads?: Map<string, boolean>;
    mentions?: Map<string, number>;
    expired?: Map<string, boolean>;

    onDragEnd: (_: DropResult) => void
    onButtonClick?: (_: string) => void;

    darkMode?: boolean,
    isDropDisabled: boolean
    theme?: Theme
}

const ServersSidebar: FC<Props> = ({
    servers,
    isAnyDragging,
    activeServerId,
    isDropDisabled,
    expired,
    mentions,
    unreads,
    theme,

    onDragEnd,
    onButtonClick,
}) => {
    return <div className={classNames('ServersSidebar')} style={theme && Object.keys(theme).length ? applyCssVars(theme) : {}}>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                isDropDisabled={isDropDisabled}
                droppableId='ServersSidebar__droppable'
                type='TEAM_BUTTON'
            >
                {(provided) => (
                    <div
                        className='ServersSidebar__droppable'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {servers?.map((server, index) => {
                            const sessionExpired = expired?.get(server.id!);
                            const hasUnreads = unreads?.get(server.id!);
                            const mentionCount = mentions?.get(server.id!);

                            return (
                                <ServerButton
                                    key={server.id}
                                    draggableId={server.id}
                                    hasUnreads={!!hasUnreads}
                                    orderedIndex={index}
                                    mentionCount={mentionCount}
                                    sessionExpired={sessionExpired}
                                    isActive={server.id === activeServerId}
                                    isAnyDragging={isAnyDragging}
                                    iconUrl={imageURLForTeam(server.team)}
                                    initial={initialForTeam(server.team)}
                                    onClick={() => onButtonClick?.(server.name)}
                                    theme={theme}
                                />
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    </div>
}

export default ServersSidebar;
