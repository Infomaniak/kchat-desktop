// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, { FC } from 'react';

import '../../css/components/ServersSidebar.scss';
import classNames from 'classnames';
import { UniqueServer } from 'types/config';

type Props = {
    servers?: UniqueServer[],
    darkMode?: boolean,
}


const ServersSidebar: FC<Props> = ({ servers, darkMode }) => {
    return <div className={classNames('servers-sidebar')}>
        Hello world
    </div>
}

export default ServersSidebar;
