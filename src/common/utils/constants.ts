// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
/* eslint-disable quote-props */

export const PRODUCTION = 'production';
export const DEVELOPMENT = 'development';

export const DEFAULT_TEAM_NAME = '.';

export const SECOND = 1000;
export const RELOAD_INTERVAL = 5 * SECOND;
export const MODAL_TRANSITION_TIMEOUT = 400;

export const MAX_SERVER_RETRIES = 3;

export const MAX_LOADING_SCREEN_SECONDS = 4 * SECOND;

// SERVERS SIDEBAR
export const SERVERS_SIDEBAR_WIDTH = 65;

export const TAB_BAR_HEIGHT = 40;
export const TAB_BAR_PADDING = 4;
export const THREE_DOT_MENU_WIDTH = 40;
export const THREE_DOT_MENU_WIDTH_MAC = 80;
export const MENU_SHADOW_WIDTH = 24;

export const DEFAULT_WINDOW_WIDTH = 1280;
export const DEFAULT_WINDOW_HEIGHT = 800;
export const MINIMUM_WINDOW_WIDTH = 600;
export const MINIMUM_WINDOW_HEIGHT = 240;

// Calls
export const MINIMUM_CALLS_WIDGET_WIDTH = 284;
export const MINIMUM_CALLS_WIDGET_HEIGHT = 90;
export const CALLS_PLUGIN_ID = 'com.mattermost.calls';
export const KMEET_ORIGIN = 'kmeet.infomaniak.com';

export const DOWNLOADS_DROPDOWN_HEIGHT = 360;
export const DOWNLOADS_DROPDOWN_WIDTH = 280;
export const DOWNLOADS_DROPDOWN_PADDING = 24;
export const DOWNLOADS_DROPDOWN_MENU_HEIGHT = 260;
export const DOWNLOADS_DROPDOWN_MENU_WIDTH = 200;
export const DOWNLOADS_DROPDOWN_MENU_PADDING = 12;

// ServersSidebarModal
export const SERVERS_SIDEBAR_PADDING_TOP = 5;
export const SERVERS_SIDEBAR_DEFAULT_MARGIN = 10;
export const SERVERS_SIDEBAR_BUTTON_HEIGHT = 40;

// In  order to display the box-shadow & radius on the left + right, use this WIDTH in the browserView for downloadsDropdown
// In  order to display the box-shadow & radius on the left + right, use this WIDTH in the webContentsView for downloadsDropdown
export const DOWNLOADS_DROPDOWN_FULL_WIDTH = DOWNLOADS_DROPDOWN_PADDING + DOWNLOADS_DROPDOWN_WIDTH + TAB_BAR_PADDING;
export const DOWNLOADS_DROPDOWN_MENU_FULL_WIDTH = (DOWNLOADS_DROPDOWN_MENU_PADDING * 2) + DOWNLOADS_DROPDOWN_MENU_WIDTH;
export const DOWNLOADS_DROPDOWN_MENU_FULL_HEIGHT = DOWNLOADS_DROPDOWN_MENU_HEIGHT + TAB_BAR_PADDING; // only bottom padding included for better positioning
export const DOWNLOADS_DROPDOWN_MAX_ITEMS = 50;
export const DOWNLOADS_DROPDOWN_AUTOCLOSE_TIMEOUT = 4000; // 4 sec

export const URLValidationStatus = {
    OK: 'OK',
    Missing: 'MISSING',
    Invalid: 'INVALID',
    Insecure: 'INSECURE',
    URLExists: 'URL_EXISTS',
    NotMattermost: 'NOT_MATTERMOST',
    URLNotMatched: 'URL_NOT_MATCHED',
    URLUpdated: 'URL_UPDATED',
};

export const nonTeamUrlPaths = [
    'plugins',
    'signup',
    'login',
    'admin',
    'channel',
    'post',
    'oauth',
    'admin_console',
];

export const localeTranslations: Record<string, string> = {
    'de': 'German',
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'it': 'Italian',
};

export const IKLoginAllowedUrls = [
    'https://login.infomaniak.com/*',
    'https://login.preprod.dev.infomaniak.ch/*',
];

export const IKDriveAllowedUrls = [
    'https://kdrive.infomaniak.com/*',
    'https://kdrive.preprod.dev.infomaniak.ch/*',
];

export const IKWelcomeAllowedUrls = [
    'https://welcome.infomaniak.com/*',
    'https://welcome.preprod.dev.infomaniak.ch/*',
];

export const KChatTokenWhitelist = [

    // Prod whitelist
    'https://*.infomaniak.com/api/v4/*',
    'https://*.infomaniak.com/broadcasting/auth',

    // Preprod whitelist
    'https://*.preprod.dev.infomaniak.ch/api/v4/*',
    'https://*.preprod.dev.infomaniak.ch/broadcasting/auth',
];
