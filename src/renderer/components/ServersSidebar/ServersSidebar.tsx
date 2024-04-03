// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {FC} from 'react';

import '../../css/components/ServersSidebar.scss';
import classNames from 'classnames';

import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';

import {Theme} from 'types/theme';
import {ServerTeam} from 'types/config';

import {applyCssVars, imageURLForTeam, initialForTeam} from './utils';
import ServerButton from './ServerButton';

type Props = {
    teams: ServerTeam[];
    activeServerId?: string;
    isAnyDragging: boolean;
    showButtonsIndex: boolean;

    unreads?: Map<string, boolean>;
    mentions?: Map<string, number>;
    expired?: Map<string, boolean>;

    onDragEnd: (_: DropResult) => void;
    onButtonClick?: (_: string) => void;

    isDropDisabled: boolean;
    theme?: Theme;
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
    showButtonsIndex,

    onDragEnd,
    onButtonClick,
}) => {
    return (
        <div
            className={classNames('ServersSidebar')}
            style={theme && Object.keys(theme).length ? applyCssVars(theme) : {}}
        >
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
                                        hasUnreads={Boolean(hasUnreads)}
                                        orderedIndex={index}
                                        mentionCount={mentionCount}
                                        sessionExpired={sessionExpired}
                                        isActive={team.id === activeServerId}
                                        isAnyDragging={isAnyDragging}
                                        iconUrl={team ? imageURLForTeam(team) : null}
                                        initial={initialForTeam(team)}
                                        onClick={() => onButtonClick?.(team.serverName)}
                                        theme={theme}
                                        showButtonsIndex={showButtonsIndex}
                                    />
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default ServersSidebar;
