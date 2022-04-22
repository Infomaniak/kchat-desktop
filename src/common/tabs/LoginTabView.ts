// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import BaseTabView from './BaseTabView';
import {TabType, TAB_LOGIN} from './TabView';

export default class LoginTabView extends BaseTabView {
    // TODO: can add custom url
    get url(): URL {
        return this.server.url;
    }

    get type(): TabType {
        return TAB_LOGIN;
    }
}
