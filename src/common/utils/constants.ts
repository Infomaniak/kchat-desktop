// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
/* eslint-disable quote-props */

export const PRODUCTION = 'production';
export const DEVELOPMENT = 'development';

export const SECOND = 1000;
export const RELOAD_INTERVAL = 5 * SECOND;
export const MODAL_TRANSITION_TIMEOUT = 400;

export const MAX_SERVER_RETRIES = 3;

export const MAX_LOADING_SCREEN_SECONDS = 4 * SECOND;

export const TAB_BAR_HEIGHT = 40;
export const TAB_BAR_PADDING = 4;
export const BACK_BAR_HEIGHT = 36;
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

export const DOWNLOADS_DROPDOWN_HEIGHT = 360;
export const DOWNLOADS_DROPDOWN_WIDTH = 280;
export const DOWNLOADS_DROPDOWN_PADDING = 24;
export const DOWNLOADS_DROPDOWN_MENU_HEIGHT = 160;
export const DOWNLOADS_DROPDOWN_MENU_WIDTH = 154;
export const DOWNLOADS_DROPDOWN_MENU_PADDING = 12;

// In  order to display the box-shadow & radius on the left + right, use this WIDTH in the browserView for downloadsDropdown
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

// supported custom login paths (oath, saml)
export const customLoginRegexPaths = [
    /^\/authorize$/i,
    /^\/oauth\/authorize$/i,
    /^\/oauth\/deauthorize$/i,
    /^\/oauth\/access_token$/i,
    /^\/oauth\/[A-Za-z0-9]+\/complete$/i,
    /^\/oauth\/[A-Za-z0-9]+\/login$/i,
    /^\/oauth\/[A-Za-z0-9]+\/signup$/i,
    /^\/api\/v3\/oauth\/[A-Za-z0-9]+\/complete$/i,
    /^\/signup\/[A-Za-z0-9]+\/complete$/i,
    /^\/login\/[A-Za-z0-9]+\/complete$/i,
    /^\/login\/sso\/saml$/i,
];

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
    'af': 'Afrikaans',
    'af-ZA': 'Afrikaans (South Africa)',
    'ar': 'Arabic',
    'ar-AE': 'Arabic (U.A.E.)',
    'ar-BH': 'Arabic (Bahrain)',
    'ar-DZ': 'Arabic (Algeria)',
    'ar-EG': 'Arabic (Egypt)',
    'ar-IQ': 'Arabic (Iraq)',
    'ar-JO': 'Arabic (Jordan)',
    'ar-KW': 'Arabic (Kuwait)',
    'ar-LB': 'Arabic (Lebanon)',
    'ar-LY': 'Arabic (Libya)',
    'ar-MA': 'Arabic (Morocco)',
    'ar-OM': 'Arabic (Oman)',
    'ar-QA': 'Arabic (Qatar)',
    'ar-SA': 'Arabic (Saudi Arabia)',
    'ar-SY': 'Arabic (Syria)',
    'ar-TN': 'Arabic (Tunisia)',
    'ar-YE': 'Arabic (Yemen)',
    'az': 'Azeri (Latin)',
    'az-AZ': 'Azeri (Azerbaijan)',
    'be': 'Belarusian',
    'be-BY': 'Belarusian (Belarus)',
    'bg': 'Bulgarian',
    'bg-BG': 'Bulgarian (Bulgaria)',
    'bs-BA': 'Bosnian (Bosnia and Herzegovina)',
    'ca': 'Catalan',
    'ca-ES': 'Catalan (Spain)',
    'cs': 'Czech',
    'cs-CZ': 'Czech (Czech Republic)',
    'cy': 'Welsh',
    'cy-GB': 'Welsh (United Kingdom)',
    'da': 'Danish',
    'da-DK': 'Danish (Denmark)',
    'de': 'German',
    'de-AT': 'German (Austria)',
    'de-CH': 'German (Switzerland)',
    'de-DE': 'German (Germany)',
    'de-LI': 'German (Liechtenstein)',
    'de-LU': 'German (Luxembourg)',
    'dv': 'Divehi',
    'dv-MV': 'Divehi (Maldives)',
    'el': 'Greek',
    'el-GR': 'Greek (Greece)',
    'en': 'English',
    'en-AU': 'English (Australia)',
    'en-BZ': 'English (Belize)',
    'en-CA': 'English (Canada)',
    'en-CB': 'English (Caribbean)',
    'en-GB': 'English (United Kingdom)',
    'en-IE': 'English (Ireland)',
    'en-JM': 'English (Jamaica)',
    'en-NZ': 'English (New Zealand)',
    'en-PH': 'English (Republic of the Philippines)',
    'en-TT': 'English (Trinidad and Tobago)',
    'en-US': 'English (United States)',
    'en-ZA': 'English (South Africa)',
    'en-ZW': 'English (Zimbabwe)',
    'eo': 'Esperanto',
    'es': 'Spanish',
    'es-AR': 'Spanish (Argentina)',
    'es-BO': 'Spanish (Bolivia)',
    'es-CL': 'Spanish (Chile)',
    'es-CO': 'Spanish (Colombia)',
    'es-CR': 'Spanish (Costa Rica)',
    'es-DO': 'Spanish (Dominican Republic)',
    'es-EC': 'Spanish (Ecuador)',
    'es-ES': 'Spanish (Spain)',
    'es-GT': 'Spanish (Guatemala)',
    'es-HN': 'Spanish (Honduras)',
    'es-MX': 'Spanish (Mexico)',
    'es-NI': 'Spanish (Nicaragua)',
    'es-PA': 'Spanish (Panama)',
    'es-PE': 'Spanish (Peru)',
    'es-PR': 'Spanish (Puerto Rico)',
    'es-PY': 'Spanish (Paraguay)',
    'es-SV': 'Spanish (El Salvador)',
    'es-UY': 'Spanish (Uruguay)',
    'es-VE': 'Spanish (Venezuela)',
    'et': 'Estonian',
    'et-EE': 'Estonian (Estonia)',
    'eu': 'Basque',
    'eu-ES': 'Basque (Spain)',
    'fa': 'Farsi',
    'fa-IR': 'Farsi (Iran)',
    'fi': 'Finnish',
    'fi-FI': 'Finnish (Finland)',
    'fo': 'Faroese',
    'fo-FO': 'Faroese (Faroe Islands)',
    'fr': 'French',
    'fr-BE': 'French (Belgium)',
    'fr-CA': 'French (Canada)',
    'fr-CH': 'French (Switzerland)',
    'fr-FR': 'French (France)',
    'fr-LU': 'French (Luxembourg)',
    'fr-MC': 'French (Principality of Monaco)',
    'gl': 'Galician',
    'gl-ES': 'Galician (Spain)',
    'gu': 'Gujarati',
    'gu-IN': 'Gujarati (India)',
    'he': 'Hebrew',
    'he-IL': 'Hebrew (Israel)',
    'hi': 'Hindi',
    'hi-IN': 'Hindi (India)',
    'hr': 'Croatian',
    'hr-BA': 'Croatian (Bosnia and Herzegovina)',
    'hr-HR': 'Croatian (Croatia)',
    'hu': 'Hungarian',
    'hu-HU': 'Hungarian (Hungary)',
    'hy': 'Armenian',
    'hy-AM': 'Armenian (Armenia)',
    'id': 'Indonesian',
    'id-ID': 'Indonesian (Indonesia)',
    'is': 'Icelandic',
    'is-IS': 'Icelandic (Iceland)',
    'it': 'Italian',
    'it-CH': 'Italian (Switzerland)',
    'it-IT': 'Italian (Italy)',
    'ja': 'Japanese',
    'ja-JP': 'Japanese (Japan)',
    'ka': 'Georgian',
    'ka-GE': 'Georgian (Georgia)',
    'kk': 'Kazakh',
    'kk-KZ': 'Kazakh (Kazakhstan)',
    'kn': 'Kannada',
    'kn-IN': 'Kannada (India)',
    'ko': 'Korean',
    'ko-KR': 'Korean (Korea)',
    'kok': 'Konkani',
    'kok-IN': 'Konkani (India)',
    'ky': 'Kyrgyz',
    'ky-KG': 'Kyrgyz (Kyrgyzstan)',
    'lt': 'Lithuanian',
    'lt-LT': 'Lithuanian (Lithuania)',
    'lv': 'Latvian',
    'lv-LV': 'Latvian (Latvia)',
    'mi': 'Maori',
    'mi-NZ': 'Maori (New Zealand)',
    'mk': 'FYRO Macedonian',
    'mk-MK': 'FYRO Macedonian (Former Yugoslav Republic of Macedonia)',
    'mn': 'Mongolian',
    'mn-MN': 'Mongolian (Mongolia)',
    'mr': 'Marathi',
    'mr-IN': 'Marathi (India)',
    'ms': 'Malay',
    'ms-BN': 'Malay (Brunei Darussalam)',
    'ms-MY': 'Malay (Malaysia)',
    'mt': 'Maltese',
    'mt-MT': 'Maltese (Malta)',
    'nb': 'Norwegian (Bokm?l)',
    'nb-NO': 'Norwegian (Bokm?l) (Norway)',
    'nl': 'Dutch',
    'nl-BE': 'Dutch (Belgium)',
    'nl-NL': 'Dutch (Netherlands)',
    'nn-NO': 'Norwegian (Nynorsk) (Norway)',
    'ns': 'Northern Sotho',
    'ns-ZA': 'Northern Sotho (South Africa)',
    'pa': 'Punjabi',
    'pa-IN': 'Punjabi (India)',
    'pl': 'Polish',
    'pl-PL': 'Polish (Poland)',
    'ps': 'Pashto',
    'ps-AR': 'Pashto (Afghanistan)',
    'pt': 'Portuguese',
    'pt-BR': 'Portuguese (Brazil)',
    'pt-PT': 'Portuguese (Portugal)',
    'qu': 'Quechua',
    'qu-BO': 'Quechua (Bolivia)',
    'qu-EC': 'Quechua (Ecuador)',
    'qu-PE': 'Quechua (Peru)',
    'ro': 'Romanian',
    'ro-RO': 'Romanian (Romania)',
    'ru': 'Russian',
    'ru-RU': 'Russian (Russia)',
    'sa': 'Sanskrit',
    'sa-IN': 'Sanskrit (India)',
    'se': 'Sami (Northern)',
    'se-FI': 'Sami (Finland)',
    'se-NO': 'Sami (Norway)',
    'se-SE': 'Sami (Sweden)',
    'sk': 'Slovak',
    'sk-SK': 'Slovak (Slovakia)',
    'sl': 'Slovenian',
    'sl-SI': 'Slovenian (Slovenia)',
    'sq': 'Albanian',
    'sq-AL': 'Albanian (Albania)',
    'sr-BA': 'Serbian (Bosnia and Herzegovina)',
    'sr-SP': 'Serbian (Serbia and Montenegro)',
    'sv': 'Swedish',
    'sv-FI': 'Swedish (Finland)',
    'sv-SE': 'Swedish (Sweden)',
    'sw': 'Swahili',
    'sw-KE': 'Swahili (Kenya)',
    'syr': 'Syriac',
    'syr-SY': 'Syriac (Syria)',
    'ta': 'Tamil',
    'ta-IN': 'Tamil (India)',
    'te': 'Telugu',
    'te-IN': 'Telugu (India)',
    'th': 'Thai',
    'th-TH': 'Thai (Thailand)',
    'tl': 'Tagalog',
    'tl-PH': 'Tagalog (Philippines)',
    'tn': 'Tswana',
    'tn-ZA': 'Tswana (South Africa)',
    'tr': 'Turkish',
    'tr-TR': 'Turkish (Turkey)',
    'tt': 'Tatar',
    'tt-RU': 'Tatar (Russia)',
    'ts': 'Tsonga',
    'uk': 'Ukrainian',
    'uk-UA': 'Ukrainian (Ukraine)',
    'ur': 'Urdu',
    'ur-PK': 'Urdu (Islamic Republic of Pakistan)',
    'uz': 'Uzbek (Latin)',
    'uz-UZ': 'Uzbek (Uzbekistan)',
    'vi': 'Vietnamese',
    'vi-VN': 'Vietnamese (Viet Nam)',
    'xh': 'Xhosa',
    'xh-ZA': 'Xhosa (South Africa)',
    'zh': 'Chinese',
    'zh-CN': 'Chinese (S)',
    'zh-HK': 'Chinese (Hong Kong)',
    'zh-MO': 'Chinese (Macau)',
    'zh-SG': 'Chinese (Singapore)',
    'zh-TW': 'Chinese (T)',
    'zu': 'Zulu',
    'zu-ZA': 'Zulu (South Africa)',
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
