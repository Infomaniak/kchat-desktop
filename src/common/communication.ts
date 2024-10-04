// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

export const GET_APP_INFO = 'get-app-info';

export const SWITCH_SERVER = 'switch-server';
export const SWITCH_SERVER_SIDEBAR = 'switch-server-sidebar';
export const SWITCH_TAB = 'switch-tab';
export const CLOSE_VIEW = 'close-view';
export const OPEN_VIEW = 'open-view';
export const SET_ACTIVE_VIEW = 'set-active-view';
export const FOCUS_BROWSERVIEW = 'focus-browserview';
export const HISTORY = 'history';

export const QUIT = 'quit';

export const GET_CONFIGURATION = 'get-configuration';
export const UPDATE_CONFIGURATION = 'update-configuration';
export const GET_LOCAL_CONFIGURATION = 'get-local-configuration';
export const RELOAD_CONFIGURATION = 'reload-config';
export const EMIT_CONFIGURATION = 'emit-configuration';

export const DARK_MODE_CHANGE = 'dark_mode_change';
export const GET_DARK_MODE = 'get-dark-mode';
export const USER_ACTIVITY_UPDATE = 'user-activity-update';
export const UPDATE_SHORTCUT_MENU = 'update-shortcut-menu';

export const OPEN_APP_MENU = 'open-app-menu';
export const APP_MENU_WILL_CLOSE = 'app-menu-will-close';

export const LOAD_RETRY = 'load_retry';
export const LOAD_SUCCESS = 'load_success';
export const LOAD_FAILED = 'load_fail';

export const MAXIMIZE_CHANGE = 'maximized_change';

export const DOUBLE_CLICK_ON_WINDOW = 'double_click';

export const SHOW_NEW_SERVER_MODAL = 'show_new_server_modal';
export const SHOW_EDIT_SERVER_MODAL = 'show-edit-server-modal';
export const SHOW_REMOVE_SERVER_MODAL = 'show-remove-server-modal';

export const RETRIEVE_MODAL_INFO = 'retrieve-modal-info';
export const MODAL_CANCEL = 'modal-cancel';
export const MODAL_RESULT = 'modal-result';
export const MODAL_OPEN = 'modal-open';
export const MODAL_CLOSE = 'modal-close';
export const NOTIFY_MENTION = 'notify_mention';
export const WINDOW_CLOSE = 'window_close';
export const WINDOW_MINIMIZE = 'window_minimize';
export const WINDOW_MAXIMIZE = 'window_maximize';
export const WINDOW_RESTORE = 'window_restore';
export const GET_FULL_SCREEN_STATUS = 'get-full-screen-status';

export const UPDATE_TARGET_URL = 'update_target_url';

export const UPDATE_TEAMS = 'update-teams';

export const PLAY_SOUND = 'play_sound';

export const GET_DOWNLOAD_LOCATION = 'get_download_location';

export const UPDATE_MENTIONS = 'update_mentions';
export const IS_UNREAD = 'is_unread';
export const UNREAD_RESULT = 'unread_result';
export const UNREADS_AND_MENTIONS = 'unreads-and-mentions';
export const SESSION_EXPIRED = 'session_expired';

export const REACT_APP_INITIALIZED = 'react-app-initialized';

export const TOGGLE_BACK_BUTTON = 'toggle-back-button';

export const SHOW_SETTINGS_WINDOW = 'show-settings-window';

export const LOADING_SCREEN_ANIMATION_FINISHED = 'loading-screen-animation-finished';
export const TOGGLE_LOADING_SCREEN_VISIBILITY = 'toggle-loading-screen-visibility';

export const SELECT_NEXT_TAB = 'select-next-tab';
export const SELECT_PREVIOUS_TAB = 'select-previous-tab';
export const FOCUS_THREE_DOT_MENU = 'focus-three-dot-menu';

export const LOADSCREEN_END = 'loadscreen-end';

export const OPEN_SERVERS_DROPDOWN = 'open-servers-dropdown';
export const CLOSE_SERVERS_DROPDOWN = 'close-servers-dropdown';
export const UPDATE_SERVERS_DROPDOWN = 'update-servers-dropdown';
export const REQUEST_SERVERS_DROPDOWN_INFO = 'request-servers-dropdown-info';
export const RECEIVE_DROPDOWN_MENU_SIZE = 'receive-dropdown-menu-size';

export const UPDATE_AVAILABLE = 'update-available';
export const UPDATE_DOWNLOADED = 'update-downloaded';
export const UPDATE_PROGRESS = 'update-progress';
export const UPDATE_REMIND_LATER = 'update-remind-later';
export const CANCEL_UPDATE_DOWNLOAD = 'cancel-update-download';
export const CANCEL_UPGRADE = 'cancel-upgrade';
export const START_UPDATE_DOWNLOAD = 'start-update-download';
export const START_UPDATE_DOWNLOAD_MANUAL = 'start-update-download-manual';
export const START_UPGRADE = 'start-upgrade';
export const CHECK_FOR_UPDATES = 'check-for-updates';
export const NO_UPDATE_AVAILABLE = 'no-update-available';

export const BROWSER_HISTORY_PUSH = 'browser-history-push';
export const APP_LOGGED_IN = 'app-logged-in';
export const APP_LOGGED_OUT = 'app-logged-out';

export const GET_AVAILABLE_SPELL_CHECKER_LANGUAGES = 'get-available-spell-checker-languages';

export const GET_VIEW_INFO_FOR_TEST = 'get-view-info-for-test';

export const GET_MODAL_UNCLOSEABLE = 'get-modal-uncloseable';

export const UPDATE_PATHS = 'update-paths';

export const UPDATE_URL_VIEW_WIDTH = 'update-url-view-width';

export const CALL_JOINED_BROWSER = 'call-joined-browser';
export const CALL_JOINED = 'call-joined';
export const CALL_ENDED = 'call-ended';
export const CALL_READY_TO_CLOSE = 'call-ready-to-close';
export const CALL_DECLINED = 'call-declined';
export const CALL_API_AVAILABLE = 'call-api-available';
export const CALL_COMMAND = 'call-command';
export const CALL_CLOSED = 'call-closed';
export const CALL_RINGING = 'call-ringing';
export const CALL_RINGING_CANCEL = 'call-ringing-cancel';
export const CALL_ACCEPTED = 'call-accepted';
export const CALL_DIAL_UPDATED = 'call-dial-updated';
export const CALL_CANCEL = 'call-cancel';
export const CONNECT_CALL = 'connect-call';

export const WINDOW_WILL_UNLOADED = 'window-will-unloaded';

export const DISPATCH_GET_DESKTOP_SOURCES = 'dispatch-get-desktop-sources';

export const RELOAD_CURRENT_VIEW = 'reload-current-view';

export const PING_DOMAIN = 'ping-domain';
export const PING_DOMAIN_RESPONSE = 'ping-domain-response';

export const GET_LANGUAGE_INFORMATION = 'get-language-information';
export const GET_AVAILABLE_LANGUAGES = 'get-available-languages';

export const VIEW_FINISHED_RESIZING = 'view-finished-resizing';

export const TOKEN_REFRESHED = 'token-refreshed';
export const TOKEN_REQUEST = 'token-request';
export const REFRESH_TOKEN = 'refresh-token';
export const RESET_TOKEN = 'reset-token';
export const SERVER_ADDED = 'server-added';
export const SERVER_DELETED = 'server-deleted';
export const RESET_AUTH = 'reset-auth';
export const RESET_TEAMS = 'reset-teams-hard';

export const THEME_CHANGED = 'theme-changed';
export const GET_APP_THEME = 'get-app-theme';

// Calls
export const GET_DESKTOP_SOURCES = 'get-desktop-sources';
export const DESKTOP_SOURCES_RESULT = 'desktop-sources-result';
export const DESKTOP_SOURCES_MODAL_REQUEST = 'desktop-sources-modal-request';
export const CALL_DIALING = 'call-dialing';
export const CALLS_JOIN_CALL = 'calls-join-call';
export const CALLS_LEAVE_CALL = 'calls-leave-call';
export const CALLS_WIDGET_RESIZE = 'calls-widget-resize';
export const CALL_OPEN_WINDOW = 'open-kmeet-window';
export const CALL_RING_CLOSE_WINDOW = 'call-ring-close-window';
export const CALL_RING_WINDOW_IS_OPEN = 'call-ring-close-window-is-open';
export const CALLS_WIDGET_SHARE_SCREEN = 'calls-widget-share-screen';
export const CALLS_WIDGET_CHANNEL_LINK_CLICK = 'calls-widget-channel-link-click';
export const CALLS_LINK_CLICK = 'calls-link-click';
export const CALLS_JOINED_CALL = 'calls-joined-call';
export const CALLS_POPOUT_FOCUS = 'calls-popout-focus';
export const CALLS_ERROR = 'calls-error';
export const CALLS_JOIN_REQUEST = 'calls-join-request';

export const REQUEST_CLEAR_DOWNLOADS_DROPDOWN = 'request-clear-downloads-dropdown';
export const CLOSE_DOWNLOADS_DROPDOWN = 'close-downloads-dropdown';
export const OPEN_DOWNLOADS_DROPDOWN = 'open-downloads-dropdown';
export const SHOW_DOWNLOADS_DROPDOWN_BUTTON_BADGE = 'show-downloads-dropdown-button-badge';
export const HIDE_DOWNLOADS_DROPDOWN_BUTTON_BADGE = 'hide-downloads-dropdown-button-badge';
export const REQUEST_DOWNLOADS_DROPDOWN_INFO = 'request-downloads-dropdown-info';
export const UPDATE_DOWNLOADS_DROPDOWN = 'update-downloads-dropdown';
export const DOWNLOADS_DROPDOWN_OPEN_FILE = 'downloads-dropdown-open-file';
export const REQUEST_HAS_DOWNLOADS = 'request-has-downloads';
export const DOWNLOADS_DROPDOWN_FOCUSED = 'downloads-dropdown-focused';
export const RECEIVE_DOWNLOADS_DROPDOWN_SIZE = 'receive-downloads-dropdown-size';
export const GET_DOWNLOADED_IMAGE_THUMBNAIL_LOCATION = 'get-downloaded-image-thumbnail-location';

export const OPEN_DOWNLOADS_DROPDOWN_MENU = 'open-downloads-dropdown-menu';
export const CLOSE_DOWNLOADS_DROPDOWN_MENU = 'close-downloads-dropdown-menu';
export const TOGGLE_DOWNLOADS_DROPDOWN_MENU = 'toggle-downloads-dropdown-menu';
export const UPDATE_DOWNLOADS_DROPDOWN_MENU = 'update-downloads-dropdown-menu';
export const UPDATE_DOWNLOADS_DROPDOWN_MENU_ITEM = 'update-downloads-dropdown-menu-item';
export const REQUEST_DOWNLOADS_DROPDOWN_MENU_INFO = 'request-downloads-dropdown-menu-info';
export const DOWNLOADS_DROPDOWN_MENU_CANCEL_DOWNLOAD = 'downloads-dropdown-menu-cancel-download';
export const DOWNLOADS_DROPDOWN_MENU_CLEAR_FILE = 'downloads-dropdown-menu-clear-file';
export const DOWNLOADS_DROPDOWN_MENU_OPEN_FILE = 'downloads-dropdown-menu-open-file';
export const DOWNLOADS_DROPDOWN_MENU_SHOW_FILE_IN_FOLDER = 'downloads-dropdown-menu-show-file-in-folder';

export const SERVERS_URL_MODIFIED = 'servers-modified';
export const SERVERS_UPDATE = 'servers-update';
export const UPDATE_SERVER_ORDER = 'update-server-order';
export const UPDATE_TAB_ORDER = 'update-tab-order';
export const GET_LAST_ACTIVE = 'get-last-active';
export const GET_ORDERED_SERVERS = 'get-ordered-servers';
export const GET_ORDERED_TABS_FOR_SERVER = 'get-ordered-tabs-for-server';

export const UPDATE_APPSTATE = 'update-appstate';
export const UPDATE_APPSTATE_TOTALS = 'update-appstate-totals';
export const UPDATE_APPSTATE_FOR_VIEW_ID = 'update-appstate-for-view-id';

export const MAIN_WINDOW_CREATED = 'main-window-created';
export const MAIN_WINDOW_RESIZED = 'main-window-resized';
export const MAIN_WINDOW_FOCUSED = 'main-window-focused';

export const VALIDATE_SERVER_URL = 'validate-server-url';

export const GET_IS_DEV_MODE = 'get-is-dev-mode';

export const TOGGLE_SECURE_INPUT = 'toggle-secure-input';
export const SCREEN_SHARE_PERMISSIONS = 'screen-share-permissions';

export const REQUEST_BROWSER_HISTORY_STATUS = 'request-browser-history-status';
export const BROWSER_HISTORY_STATUS_UPDATED = 'browser-history-status-updated';

export const NOTIFICATION_CLICKED = 'notification-clicked';

// Legacy code remove signal
export const LEGACY_OFF = 'legacy-off';

export const UPDATE_SERVERS_SIDEBAR = 'update-servers-sidebar';
export const UPDATE_SIDEBAR_MODAL = 'update-sidebar-modal';
export const PREFERRED_THEME = 'preferred-theme';
export const TEAMS_ORDER_PREFERENCE = 'teams-order-preference';
export const TEAMS_ORDER_PREFERENCE_UPDATED = 'teams-order-updated';
export const GET_SERVER_THEME = 'get-server-theme';
export const TEAM_MOUSE_IN = 'team-mouse-in';
export const TEAM_MOUSE_OUT = 'team-mouse-out';
export const USER_LOCALE = 'user-locale';
export const UPDATE_SERVERS_SIDEBAR_MODAL_SHORTCUT = 'update-servers-sidebar-modal-shortcut';
