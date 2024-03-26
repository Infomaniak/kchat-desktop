import classNames from "classnames";
import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Theme } from "types/theme";

type Props = {
    draggableId: string
    sessionExpired?: boolean
    hasUnreads: boolean
    mentionCount?: number
    isPredefined: boolean
    orderedIndex: number
    isActive: boolean
    isAnyDragging: boolean
    iconUrl: string | null
    initial: string
    theme?: Theme

    onClick?: () => void;
}

const ServerButton: FC<Props> = ({
    draggableId,
    sessionExpired,
    hasUnreads,
    mentionCount,
    orderedIndex,
    isActive,
    isPredefined,
    iconUrl,
    isAnyDragging,
    initial,
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
                draggableId={draggableId}
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
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onClick={onClick}

                    >
                        <span className="ServerButton__content">
                            <span className="ServerButton__initial">{initial}</span>
                        </span>
                       {/* {iconUrl && <span style={{backgroundImage: `url(${iconUrl})`}} />} */}
                       {/* {iconUrl && <span className="ServerButton__initial">{initial}</span>} */}
                    </button>
                )}
            </Draggable>
}

export default ServerButton
