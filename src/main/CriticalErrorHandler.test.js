// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
'use strict';

import {spawn} from 'child_process';
import path from 'path';

import {app, dialog} from 'electron';

import {CriticalErrorHandler} from './CriticalErrorHandler';

jest.mock('path', () => ({
    join: jest.fn().mockImplementation((...args) => args.join('/')),
}));

jest.mock('electron', () => ({
    app: {
        name: 'Mattermost',
        getVersion: () => '5.0.0',
        getPath: (folder) => `/${folder}`,
        relaunch: jest.fn(),
        isReady: jest.fn(),
        exit: jest.fn(),
        once: jest.fn(),
    },
    dialog: {
        showMessageBox: jest.fn(),
    },
}));

jest.mock('fs', () => ({
    readFile: jest.fn(),
    readdir: jest.fn(),
    writeFileSync: jest.fn(),
}));

jest.mock('child_process', () => ({
    spawn: jest.fn(),
}));

jest.mock('main/i18nManager', () => ({
    localizeMessage: jest.fn(),
}));

jest.mock('@sentry/electron/main', () => ({
    captureException: jest.fn(),
    close: jest.fn(),
}));

describe('main/CriticalErrorHandler', () => {
    const criticalErrorHandler = new CriticalErrorHandler();
    const env = process.env;

    describe('processUncaughtExceptionHandler', () => {
        beforeEach(() => {
            app.isReady.mockImplementation(() => true);
            process.env = {...env, NODE_ENV: 'jest'};
        });

        afterAll(() => {
            process.env = env;
        });

        it('should defer to app ready event if app is not ready', async () => {
            app.isReady.mockImplementation(() => false);
            await criticalErrorHandler.processUncaughtExceptionHandler(new Error('test'));
            expect(app.once).toBeCalledWith('ready', expect.any(Function));
            expect(dialog.showMessageBox).not.toBeCalled();
        });

        it('should open external file on Show Details', async () => {
            path.join.mockImplementation(() => 'testfile.txt');
            const promise = Promise.resolve({response: process.platform === 'darwin' ? 2 : 0});
            dialog.showMessageBox.mockImplementation(() => promise);
            await criticalErrorHandler.processUncaughtExceptionHandler(new Error('test'));
            await promise;
            await Promise.resolve();
            expect(spawn).toBeCalledWith(expect.any(String), expect.arrayContaining(['testfile.txt']), expect.any(Object));
        });

        it('should restart app on Reopen', async () => {
            path.join.mockImplementation(() => 'testfile.txt');
            const promise = Promise.resolve({response: process.platform === 'darwin' ? 0 : 2});
            dialog.showMessageBox.mockImplementation(() => promise);
            await criticalErrorHandler.processUncaughtExceptionHandler(new Error('test'));
            await promise;
            await Promise.resolve();
            expect(app.relaunch).toBeCalled();
        });
    });
});
