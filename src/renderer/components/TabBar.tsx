// Copyright (c) 2015-2016 Yuya Ochiai
// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import classNames from 'classnames';
import React from 'react';
import type {DropResult} from 'react-beautiful-dnd';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {Nav} from 'react-bootstrap';
import type {IntlShape} from 'react-intl';
import {injectIntl} from 'react-intl';

import type {UniqueView} from 'types/config';

type Props = {
    activeTabId?: string;
    activeServerId?: string;
    id: string;
    isDarkMode: boolean;
    onSelect: (id: string) => void;
    onCloseTab: (id: string) => void;
    tabs: UniqueView[];
    sessionsExpired: Record<string, boolean>;
    unreadCounts: Record<string, boolean>;
    mentionCounts: Record<string, number>;
    onDrop: (result: DropResult) => void;
    tabsDisabled?: boolean;
    isMenuOpen?: boolean;
    intl: IntlShape;
};

class TabBar extends React.PureComponent<Props> {
    onCloseTab = (id: string) => {
        return (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            this.props.onCloseTab(id);
        };
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.props.onDrop}>
                <Droppable
                    isDropDisabled={this.props.tabsDisabled}
                    droppableId='tabBar'
                    direction='horizontal'
                >
                    {(provided) => (
                        <Nav
                            ref={provided.innerRef}
                            className={classNames('TabBar', {
                                darkMode: this.props.isDarkMode,
                            })}
                            id={this.props.id}
                            variant='tabs'
                            {...provided.droppableProps}
                        >
                            {this.props.isMenuOpen ? <span className='TabBar-nonDrag'/> : null}
                            {provided.placeholder}
                        </Nav>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default injectIntl(TabBar);
