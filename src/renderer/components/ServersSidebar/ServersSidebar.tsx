// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, { FC } from 'react';

import '../../css/components/ServersSidebar.scss';
import classNames from 'classnames';
import ServerButton from './ServerButton';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { applyCssVars, imageURLForTeam, initialForTeam } from './utils';
import { Theme } from 'types/theme';
import { ServerTeam } from 'types/config';

type Props = {
    teams: Array<ServerTeam>,
    activeServerId?: string
    isAnyDragging: boolean

    unreads?: Map<string, boolean>;
    mentions?: Map<string, number>;
    expired?: Map<string, boolean>;

    onDragEnd: (_: DropResult) => void
    onButtonClick?: (_: string) => void;

    isDropDisabled: boolean
    theme?: Theme
}

const ServersSidebar: FC<Props> = ({
    teams,
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
                        {teams?.map((team, index) => {
                            const sessionExpired = expired?.get(team.serverId!);
                            const hasUnreads = unreads?.get(team.serverId!);
                            const mentionCount = mentions?.get(team.serverId!);

                            return (
                                <ServerButton
                                    key={team.id}
                                    draggableId={team.id}
                                    hasUnreads={!!hasUnreads}
                                    orderedIndex={index}
                                    mentionCount={mentionCount}
                                    sessionExpired={sessionExpired}
                                    isActive={team.id === activeServerId}
                                    isAnyDragging={isAnyDragging}
                                    iconUrl={team ? imageURLForTeam(team) : null}
                                    initial={initialForTeam(team)}
                                    onClick={() => onButtonClick?.(team.serverName)}
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
