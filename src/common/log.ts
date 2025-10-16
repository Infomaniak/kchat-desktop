// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import fs from 'fs';
import path from 'path';

import type {LevelOption} from 'electron-log';
import log from 'electron-log';

import Util from 'common/utils/util';
import {getLogsPath} from 'main/utils';

export const setLoggingLevel = (level: string) => {
    if (log.transports.file.level === level) {
        return;
    }
    log.error('Logger', 'Log level set to:', level);

    log.transports.console.level = level as LevelOption;
    log.transports.file.level = level as LevelOption;
};

logInit();

// Start on info by default
setLoggingLevel('info');

export const getLevel = () => log.transports.file.level as string;

function logInit() {
    try {
        const pathLogFile = path.join(getLogsPath(), 'kchat-desktop.log');
        if (!fs.existsSync(pathLogFile)) {
            fs.openSync(pathLogFile, 'w');
        }
        const {size} = fs.statSync(pathLogFile);
        const sizeMb = size / (1024 * 1024);
        if (sizeMb > 500) {
            fs.unlink(`${getLogsPath()}/kchat-desktop.log`, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
        log.initialize({preload: true});
        log.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{processType}] [{level}] {text}';
        log.transports.file.resolvePathFn = () => pathLogFile;
    } catch (err) {
        // do nothing
    }
}

export class Logger {
    private prefixes: string[];

    constructor(...prefixes: string[]) {
        this.prefixes = this.shortenPrefixes(...prefixes);
    }

    withPrefix = (...prefixes: string[]) => {
        return {
            error: this.prefixed(log.error, ...prefixes),
            warn: this.prefixed(log.warn, ...prefixes),
            info: this.prefixed(log.info, ...prefixes),
            verbose: this.prefixed(log.verbose, ...prefixes),
            debug: this.prefixed(log.debug, ...prefixes),
            silly: this.prefixed(log.silly, ...prefixes),
            log: this.prefixed(log.log, ...prefixes),
        };
    };

    private prefixed = (func: (...args: any[]) => void, ...additionalPrefixes: string[]) => {
        return (...args: any[]) => func(...this.prefixes, ...this.shortenPrefixes(...additionalPrefixes), ...args);
    };

    private shortenPrefixes = (...prefixes: string[]) => {
        return prefixes.map((prefix) => `[${Util.shorten(prefix)}]`);
    };

    error = this.prefixed(log.error);
    warn = this.prefixed(log.warn);
    info = this.prefixed(log.info);
    verbose = this.prefixed(log.verbose);
    debug = this.prefixed(log.debug);
    silly = this.prefixed(log.silly);
    log = this.prefixed(log.log);
}
