import classNames from "classnames";
import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

type Props = {
    index: number
    sessionExpired: boolean
    hasUnreads: boolean
    mentionCount: number
    isPredefined: boolean
    orderedIndex: number
    isActive: boolean
}

const ServerButton: FC<Props> = ({index, sessionExpired, hasUnreads, mentionCount, orderedIndex, isActive, isPredefined}) => {
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

    return  <Draggable
                key={index}
                draggableId={`ServerButton-${index}`}
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
                            className={classNames('ServerButton-handle', {
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
}

export default ServerButton
