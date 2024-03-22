import classNames from "classnames";
import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

type Props = {
    index: number
    sessionExpired?: boolean
    hasUnreads: boolean
    mentionCount?: number
    isPredefined: boolean
    orderedIndex: number
    isActive: boolean
    isAnyDragging: boolean

    setButtonRef: (serverIndex: number, refMethod?: (element: HTMLButtonElement) => unknown) => (ref: HTMLButtonElement) => void
}

const ServerButton: FC<Props> = ({
    index,
    sessionExpired,
    hasUnreads,
    mentionCount,
    orderedIndex,
    isActive,
    isPredefined,
    isAnyDragging,
    setButtonRef,
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
            <div className='ServerButton__badge-count'>
                <span>{mentionCount > 99 ? '99+' : mentionCount}</span>
            </div>
        );
    } else if (hasUnreads) {
        badgeDiv = (
            <div className='ServerButton__badge-dot'/>
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
                        className={classNames('ServerButton', {
                            dragging: snapshot.isDragging,
                            anyDragging: isAnyDragging,
                            active: isActive,
                        })}
                        ref={setButtonRef(orderedIndex, provided.innerRef)}
                        {...provided.draggableProps}
                    >

                    </button>
                )}
            </Draggable>
}

export default ServerButton
