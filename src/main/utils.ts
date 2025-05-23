// Copyright (c) 2015-2016 Yuya Ochiai
// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {exec as execOriginal} from 'child_process';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
const exec = promisify(execOriginal);

import type {BrowserWindow} from 'electron';
import {app} from 'electron';

import {BACK_BAR_HEIGHT, customLoginRegexPaths, PRODUCTION, SERVERS_SIDEBAR_WIDTH, TAB_BAR_HEIGHT} from 'common/utils/constants';
import {isAdminUrl, isPluginUrl, isTeamUrl, isUrlType, parseURL} from 'common/utils/url';
import Utils from 'common/utils/util';

import type {Args} from 'types/args';

export function isInsideRectangle(container: Electron.Rectangle, rect: Electron.Rectangle) {
    return container.x <= rect.x && container.y <= rect.y && container.width >= rect.width && container.height >= rect.height;
}

export function shouldBeHiddenOnStartup(parsedArgv: Args) {
    if (parsedArgv.hidden) {
        return true;
    }
    if (process.platform === 'darwin') {
        if (app.getLoginItemSettings().wasOpenedAsHidden) {
            return true;
        }
    }
    return false;
}

export function getWindowBoundaries(win: BrowserWindow, hasBackBar = false, hasServersSidebar = true) {
    const {width, height} = win.getContentBounds();
    return getAdjustedWindowBoundaries(width, height, hasBackBar, hasServersSidebar);
}

export function getAdjustedWindowBoundaries(width: number, height: number, hasBackBar = false, hasServersSidebar = true) {
    return {
        x: hasServersSidebar ? SERVERS_SIDEBAR_WIDTH : 0,
        y: TAB_BAR_HEIGHT + (hasBackBar ? BACK_BAR_HEIGHT : 0),
        width: width - (hasServersSidebar ? SERVERS_SIDEBAR_WIDTH : 0),
        height: height - TAB_BAR_HEIGHT - (hasBackBar ? BACK_BAR_HEIGHT : 0),
    };
}

export function shouldHaveBackBar(serverUrl: URL, inputURL: URL) {
    if (isUrlType('login', serverUrl, inputURL)) {
        const serverURL = parseURL(serverUrl);
        const subpath = serverURL ? serverURL.pathname : '';
        const parsedURL = parseURL(inputURL);
        if (!parsedURL) {
            return false;
        }
        const urlPath = parsedURL.pathname;
        const replacement = subpath.endsWith('/') ? '/' : '';
        const replacedPath = urlPath.replace(subpath, replacement);
        for (const regexPath of customLoginRegexPaths) {
            if (replacedPath.match(regexPath)) {
                return true;
            }
        }

        return false;
    }
    return !isTeamUrl(serverUrl, inputURL) && !isAdminUrl(serverUrl, inputURL) && !isPluginUrl(serverUrl, inputURL);
}

export function getLocalURLString(urlPath: string, query?: Map<string, string>, isMain?: boolean) {
    let pathname;
    const processPath = isMain ? '' : '/renderer';
    const mode = Utils.runMode();
    const protocol = 'file';
    const hostname = '';
    const port = '';
    if (mode === PRODUCTION) {
        pathname = path.join(app.getAppPath(), `${processPath}/${urlPath}`);
    } else {
        pathname = path.resolve(__dirname, `../../dist/${processPath}/${urlPath}`); // TODO: find a better way to work with webpack on this
    }
    const localUrl = new URL(`${protocol}://${hostname}${port}`);
    localUrl.pathname = pathname;
    if (query) {
        query.forEach((value: string, key: string) => {
            localUrl.searchParams.append(encodeURIComponent(key), encodeURIComponent(value));
        });
    }

    return localUrl.href;
}

export function getLocalPreload(file: string) {
    if (Utils.runMode() === PRODUCTION) {
        return path.join(app.getAppPath(), `${file}`);
    }
    return path.resolve(__dirname, `../../dist/${file}`);
}

export function composeUserAgent() {
    const baseUserAgent = app.userAgentFallback.split(' ');

    // specify if mas build to show migration banner
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const isMas = __IS_MAC_APP_STORE__ || Utils.runMode() === 'development' ? ` Mas/${app.getVersion()}` : '';

    // filter out the Mattermost tag that gets added earlier on
    const filteredUserAgent = baseUserAgent.filter((ua) => !ua.startsWith('Mattermost'));

    return `${filteredUserAgent.join(' ')} Mattermost/${app.getVersion()}${isMas} kMeet/2.0.1`;
}

export function isStringWithLength(string: unknown): boolean {
    return typeof string === 'string' && string.length > 0;
}

export function getPercentage(received: number, total: number) {
    if (total === 0) {
        return 0;
    }
    return Math.round((received / total) * 100);
}

export function readFilenameFromContentDispositionHeader(header: string[]) {
    return header?.join(';')?.match(/(?<=filename=")(.*)(?=")/g)?.[0];
}

export function doubleSecToMs(d: number): number {
    return Math.round(d * 1000);
}

export function shouldIncrementFilename(filepath: string, increment = 0): string {
    const {dir, name, ext} = path.parse(filepath);
    const incrementString = increment ? ` (${increment})` : '';
    const filename = `${name}${incrementString}${ext}`;

    let fileExists = true;
    try {
        fs.accessSync(path.join(dir, filename), fs.constants.F_OK);
    } catch (error) {
        fileExists = false;
    }

    if (fileExists) {
        return shouldIncrementFilename(filepath, increment + 1);
    }
    return filename;
}

const logsPath: { [os: string]: string } = {
    darwin: `${app.getPath('home')}/Library/Logs/${app.name}/`,
    win32: `${app.getPath('appData')}\\${app.name}\\logs\\`,
    linux: `${app.getPath('appData')}/${app.name}/logs/`,
};

export const getLogsPath = () => logsPath[process.platform];

/**
 * Returns if the error is a SIGPIPE error. SIGPIPE errors should generally be
 * logged at most once, to avoid a loop.
 *
 * @see https://github.com/microsoft/vscode-remote-release/issues/6481
 */
export function isSigPipeError(e: unknown): e is Error {
    if (!e || typeof e !== 'object') {
        return false;
    }

    const cast = e as Record<string, string | undefined>;
    return cast.code === 'EPIPE' && cast.syscall?.toUpperCase() === 'WRITE';
}
export function resetScreensharePermissionsMacOS() {
    if (process.platform !== 'darwin') {
        return Promise.resolve();
    }
    return exec('tccutil reset ScreenCapture Mattermost.Desktop',
        {timeout: 1000});
}

export function openScreensharePermissionsSettingsMacOS() {
    if (process.platform !== 'darwin') {
        return Promise.resolve();
    }
    return exec('open "x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture"',
        {timeout: 1000});
}
