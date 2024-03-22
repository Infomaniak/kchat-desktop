// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, { FC } from 'react';

import '../../css/components/ServersSidebar.scss';
import classNames from 'classnames';
import { UniqueServer } from 'types/config';
import ServerButton from './ServerButton';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

type Server = {
    name: string
    id: string
    url: string
}

type Props = {
    servers: Server[],

    unreads?: Map<string, boolean>;
    mentions?: Map<string, number>;
    expired?: Map<string, boolean>;

    onDragStart: () => void
    onDragEnd: (_: DropResult) => void

    darkMode?: boolean,
    isDropDisabled: boolean
}


const ServersSidebar: FC<Props> = ({ servers, darkMode, isDropDisabled, expired, mentions, unreads, onDragEnd, onDragStart }) => {

    return <div className={classNames('ServersSidebar')}>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Droppable
                isDropDisabled={isDropDisabled}
                droppableId='ServerSidebar__droppable'
            >
                {({provided}) => (
                    <div
                        className='ServerSidebar__droppable'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
{                           servers?.map((server, orderedIndex) => {
                                        const index = servers?.indexOf(server);
                                        const sessionExpired = expired?.get(server.id!);
                                        const hasUnreads = unreads?.get(server.id!);
                                        const mentionCount = mentions?.get(server.id!);

                                        let badgeDiv: React.ReactNode;
                                        if (sessionExpired) {
                                            badgeDiv = (
                                                <div className='ServerSidebar__badge-expired'>
                                                    <i className='icon-alert-circle-outline'/>
                                                </div>
                                            );
                                        } else if (mentionCount && mentionCount > 0) {
                                            badgeDiv = (
                                                <div className='ServerSidebar__badge-count'>
                                                    <span>{mentionCount > 99 ? '99+' : mentionCount}</span>
                                                </div>
                                            );
                                        } else if (hasUnreads) {
                                            badgeDiv = (
                                                <div className='ServerSidebar__badge-dot'/>
                                            );
                                        }

                                        return (
                                            <Draggable
                                                key={index}
                                                draggableId={`ServerSidebar__draggable-${index}`}
                                                index={orderedIndex}
                                                disableInteractiveElementBlocking={true}
                                            >
                                                {(provided, snapshot) => (
                                                    <button
                                                        className={classNames('ServerSidebar__button', {
                                                            dragging: snapshot.isDragging,
                                                            anyDragging: this.state.isAnyDragging,
                                                            active: this.isActiveServer(server),
                                                        })}
                                                        ref={this.setButtonRef(orderedIndex, provided.innerRef)}
                                                        {...provided.draggableProps}
                                                        onClick={this.selectServer(server)}
                                                        style={getStyle(provided.draggableProps.style)}
                                                    >
                                                        <div
                                                            className={classNames('ServerSidebar__draggable-handle', {
                                                                dragging: snapshot.isDragging,
                                                            })}
                                                            {...provided.dragHandleProps}
                                                            onClick={this.handleClickOnDragHandle}
                                                        >
                                                            <i className='icon-drag-vertical'/>
                                                            {this.isActiveServer(server) ? <i className='icon-check'/> : <i className='icon-server-variant'/>}
                                                            <span>{server.name}</span>
                                                        </div>
                                                        {!server.isPredefined && <div className='ServerSidebar__indicators'>
                                                            <button
                                                                className='ServerSidebar__button-edit'
                                                                onClick={this.editServer(server.id!)}
                                                            >
                                                                <i className='icon-pencil-outline'/>
                                                            </button>
                                                            <button
                                                                className='ServerSidebar__button-remove'
                                                                onClick={this.removeServer(server.id!)}
                                                            >
                                                                <i className='icon-trash-can-outline'/>
                                                            </button>
                                                            {badgeDiv && <div className='ServerSidebar__badge'>
                                                                {badgeDiv}
                                                            </div>}
                                                        </div>}
                                                    </button>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        {/* {servers?.map(server => {
            return <ServerButton key={server.id} />
        })} */}
    </div>
}

export default ServersSidebar;
