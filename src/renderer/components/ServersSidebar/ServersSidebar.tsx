// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, { FC } from 'react';

import '../../css/components/ServersSidebar.scss';
import classNames from 'classnames';
import ServerButton from './ServerButton';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

type Server = {
    name: string
    id: string
    url: string
    isPredefined: boolean
}

type Props = {
    servers: Server[],
    activeServerId?: string
    isAnyDragging: boolean

    unreads?: Map<string, boolean>;
    mentions?: Map<string, number>;
    expired?: Map<string, boolean>;

    onDragStart: () => void
    onDragEnd: (_: DropResult) => void
    setButtonRef: (serverIndex: number, refMethod?: (element: HTMLButtonElement) => unknown) => (ref: HTMLButtonElement) => void

    darkMode?: boolean,
    isDropDisabled: boolean
}


const ServersSidebar: FC<Props> = ({
    servers,
    darkMode,
    isAnyDragging,
    activeServerId,
    isDropDisabled,
    expired,
    mentions,
    unreads,
    onDragEnd,
    onDragStart,
    setButtonRef,
}) => {
    return <div className={classNames('ServersSidebar')}>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Droppable
                isDropDisabled={isDropDisabled}
                droppableId='ServersSidebar__droppable'
            >
                {(provided) => (
                    <div
                        className='ServersSidebar__droppable'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {servers?.map((server, orderedIndex) => {
                            const index = servers?.indexOf(server);
                            const sessionExpired = expired?.get(server.id!);
                            const hasUnreads = unreads?.get(server.id!);
                            const mentionCount = mentions?.get(server.id!);

                            return (
                                <ServerButton
                                    key={server.id}
                                    index={index}
                                    hasUnreads={!!hasUnreads}
                                    orderedIndex={orderedIndex}
                                    isPredefined={server.isPredefined}
                                    mentionCount={mentionCount}
                                    sessionExpired={sessionExpired}
                                    isActive={server.id === activeServerId}
                                    isAnyDragging={isAnyDragging}
                                    setButtonRef={setButtonRef}
                                />
                            );
                        })}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    </div>
}

export default ServersSidebar;
