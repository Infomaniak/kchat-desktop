// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {nativeTheme} from 'electron';

import {THEME_CHANGED} from 'common/communication';
import Config from 'common/config';
import {Logger} from 'common/log';
import viewManager from 'main/views/viewManager';

const log = new Logger('ThemeManager');

export type ThemeType = 'light' | 'dark' | 'auto';

export function getThemeType(theme: any): ThemeType {
    if (!theme) {
        return 'light';
    }
    if (theme.ksuiteTheme === 'auto') {
        return 'auto';
    }
    if (theme.ksuiteTheme === 'dark') {
        return 'dark';
    }
    if (theme.ksuiteTheme === 'light') {
        return 'light';
    }
    if (theme.centerChannelBg === '#1A1D21' || theme.centerChannelBg === '#1f1f1f') {
        return 'dark';
    }
    return 'light';
}

export function isDarkTheme(data: any): boolean {
    const type = getThemeType(data);
    if (type === 'auto') {
        return nativeTheme.shouldUseDarkColors;
    }
    return type === 'dark';
}

export function handleThemeChanged(data: any): void {
    log.debug('handleThemeChanged', data.ksuiteTheme);

    Config.set('theme', data);

    const isDark = isDarkTheme(data);
    if (isDark !== Config.darkMode) {
        Config.set('darkMode', isDark);
    }

    viewManager.sendToAllViews(THEME_CHANGED, data);
}

export function handleSystemThemeChange(): void {
    const currentTheme = Config.theme;
    const themeType = getThemeType(currentTheme);

    if (themeType !== 'auto') {
        return;
    }

    const isDark = nativeTheme.shouldUseDarkColors;
    if (isDark !== Config.darkMode) {
        log.debug('Auto mode: updated darkMode to', isDark);
        Config.set('darkMode', isDark);
    }
}

export function initTheme(): void {
    if (!Config.theme) {
        Config.set('darkMode', false);
        return;
    }

    const type = getThemeType(Config.theme);

    if (type === 'auto') {
        Config.set('darkMode', nativeTheme.shouldUseDarkColors);
    } else {
        Config.set('darkMode', type === 'dark');
    }
}
