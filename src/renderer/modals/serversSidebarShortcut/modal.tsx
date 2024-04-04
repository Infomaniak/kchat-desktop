// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import classNames from 'classnames';
import React, {useEffect, useState} from 'react';

type State = {
    currentTeam?: { index: number; name: string };
}

export const ServerSidebarModal = () => {
    const [state, setState] = useState<State>();

    useEffect(() => {
        window.desktop.serversSidebar.onUpdateModal((currentTeam) => setState({currentTeam}));
    }, []);

    console.log('state', state);

    return (
        <div className={classNames('ShortcutTooltip', {isOpen: Boolean(state?.currentTeam)})}>
            <span className='ShortcutTooltip__name'>{state?.currentTeam?.name}</span>
            <div className='ShortcutTooltip__shortcut'>
                <span className='ShortcutTooltip__item'>{'⌘'}</span>
                <span className='ShortcutTooltip__item'>{'⌥'}</span>
                <span className='ShortcutTooltip__item'>{state?.currentTeam?.index}</span>
            </div>
        </div>
    );
};
