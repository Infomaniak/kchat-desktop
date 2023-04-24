// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// Copyright (c) 2015-2016 Yuya Ochiai

// This files uses CommonJS.
/* eslint-disable import/no-commonjs */
'use strict';

const {merge} = require('webpack-merge');

const CopyPlugin = require('copy-webpack-plugin');

const base = require('./webpack.config.base');

module.exports = merge(base, {
    entry: {
        index: './src/main/app/index.ts',
        mainWindow: './src/main/preload/mainWindow.js',
        call: './src/main/preload/call.js',
        callDial: './src/main/preload/callDial.js',
        dropdown: './src/main/preload/dropdown.js',
        downloadsDropdown: './src/main/preload/downloadsDropdown.js',
        downloadsDropdownMenu: './src/main/preload/downloadsDropdownMenu.js',
        preload: './src/main/preload/mattermost.js',
        modalPreload: './src/main/preload/modalPreload.js',
        loadingScreenPreload: './src/main/preload/loadingScreenPreload.js',
        urlView: './src/main/preload/urlView.js',
        callsWidget: './src/main/preload/callsWidget.js',
    },
    externals: {
        'macos-notification-state': 'require("macos-notification-state")',
        'windows-focus-assist': 'require("windows-focus-assist")',
        '@sentry/electron': 'require("@sentry/electron")',
    },
    module: {
        noParse: /external_api\\.js/,
        rules: [{
            test: /\.(js|ts)?$/,
            use: {
                loader: 'babel-loader',
                options: {
                    include: ['@babel/plugin-proposal-class-properties'],
                },
            },
        }, {
            test: /\.mp3$/,
            type: 'asset/inline',
        },
        {
            test: /\.node$/,
            loader: 'node-loader',
        }],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: 'assets/**/*',
                context: 'src',
            }],
        }),
    ],
    node: {
        __filename: true,
        __dirname: true,
    },
    target: 'electron-main',
});

/* eslint-enable import/no-commonjs */
