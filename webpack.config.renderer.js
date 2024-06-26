// Copyright (c) 2015-2016 Yuya Ochiai
// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {ProvidePlugin} = require('webpack');
const {merge} = require('webpack-merge');

const base = require('./webpack.config.base');

module.exports = merge(base, {
    entry: {
        index: './src/renderer/index.tsx',
        settings: './src/renderer/modals/settings/settings.tsx',
        call: './src/renderer/calls/call.ts',
        callDialing: './src/renderer/callDialing.tsx',
        dropdown: './src/renderer/dropdown.tsx',
        downloadsDropdownMenu: './src/renderer/downloadsDropdownMenu.tsx',
        downloadsDropdown: './src/renderer/downloadsDropdown.tsx',
        urlView: './src/renderer/modals/urlView/urlView.tsx',
        newServer: './src/renderer/modals/newServer/newServer.tsx',
        editServer: './src/renderer/modals/editServer/editServer.tsx',
        removeServer: './src/renderer/modals/removeServer/removeServer.tsx',
        loginModal: './src/renderer/modals/login/login.tsx',
        permissionModal: './src/renderer/modals/permission/permission.tsx',
        certificateModal: './src/renderer/modals/certificate/certificate.tsx',
        loadingScreen: './src/renderer/modals/loadingScreen/index.tsx',
        welcomeScreen: './src/renderer/modals/welcomeScreen/welcomeScreen.tsx',
        serversSidebar: './src/renderer/serversSidebar.tsx',
        serversSidebarShortcutModal: './src/renderer/modals/serversSidebarShortcut/serversSidebarShortcut.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist/renderer'),
        filename: '[name]_bundle.js',
        assetModuleFilename: '[name].[ext]',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'kChat Desktop App',
            template: 'src/renderer/index.html',
            chunks: ['index'],
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            title: 'kChat Desktop Settings',
            template: 'src/renderer/index.html',
            chunks: ['settings'],
            filename: 'settings.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Call Window',
            template: 'src/renderer/calls/call.html',
            chunks: ['call'],
            filename: 'call.html',
        }),
        new HtmlWebpackPlugin({
            title: '🔉',
            template: 'src/renderer/call-dialing.html',
            chunks: ['callDialing'],
            filename: 'callDialing.html',
        }),
        new HtmlWebpackPlugin({
            title: 'kChat Desktop Settings',
            template: 'src/renderer/index.html',
            chunks: ['dropdown'],
            filename: 'dropdown.html',
        }),
        new HtmlWebpackPlugin({
            title: 'kChat Desktop Downloads',
            template: 'src/renderer/index.html',
            chunks: ['downloadsDropdown'],
            filename: 'downloadsDropdown.html',
        }),
        new HtmlWebpackPlugin({
            title: 'kChat Desktop Downloads',
            template: 'src/renderer/index.html',
            chunks: ['downloadsDropdownMenu'],
            filename: 'downloadsDropdownMenu.html',
        }),
        new HtmlWebpackPlugin({
            title: 'kChat Desktop Settings',
            template: 'src/renderer/index.html',
            chunks: ['urlView'],
            filename: 'urlView.html',
        }),
        new HtmlWebpackPlugin({
            title: 'kChat Desktop Settings',
            template: 'src/renderer/index.html',
            chunks: ['newServer'],
            filename: 'newServer.html',
        }),
        new HtmlWebpackPlugin({
            title: 'kChat Desktop Settings',
            template: 'src/renderer/index.html',
            chunks: ['editServer'],
            filename: 'editServer.html',
        }),
        new HtmlWebpackPlugin({
            title: 'kChat Desktop Settings',
            template: 'src/renderer/index.html',
            chunks: ['removeServer'],
            filename: 'removeServer.html',
        }),
        new HtmlWebpackPlugin({
            title: 'kChat Desktop Settings',
            template: 'src/renderer/index.html',
            chunks: ['loginModal'],
            filename: 'loginModal.html',
        }),
        new HtmlWebpackPlugin({
            title: 'kChat Desktop Settings',
            template: 'src/renderer/index.html',
            chunks: ['permissionModal'],
            filename: 'permissionModal.html',
        }),
        new HtmlWebpackPlugin({
            title: 'kChat Desktop Settings',
            template: 'src/renderer/index.html',
            chunks: ['certificateModal'],
            filename: 'certificateModal.html',
        }),
        new HtmlWebpackPlugin({
            title: 'kChat Desktop Settings',
            template: 'src/renderer/index.html',
            chunks: ['loadingScreen'],
            filename: 'loadingScreen.html',
        }),
        new HtmlWebpackPlugin({
            title: 'kChat Desktop Servers Sidebar',
            template: 'src/renderer/servers-sidebar.html',
            chunks: ['serversSidebar'],
            filename: 'serversSidebar.html',
        }),
        new HtmlWebpackPlugin({
            title: 'kChat Desktop Servers Sidebar',
            template: 'src/renderer/index.html',
            chunks: ['serversSidebarShortcutModal'],
            filename: 'serversSidebarShortcutModal.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Mattermost Desktop Settings',
            template: 'src/renderer/index.html',
            chunks: ['welcomeScreen'],
            filename: 'welcomeScreen.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash].css',
            ignoreOrder: true,
            chunkFilename: '[id].[contenthash].css',
        }),
        new ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
    module: {
        noParse: /external_api\\.js/,
        rules: [{
            test: /\.css$/,
            exclude: /\.lazy\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
            ],
        }, {
            test: /\.lazy\.css$/,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        injectType: 'lazyStyleTag',
                    },
                },
                'css-loader',
            ],
        }, {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ],
        }, {
            test: /\.mp3$/,
            type: 'asset/inline',
        }, {
            test: /\.(svg|gif)$/,
            type: 'asset/resource',
        }, {
            test: /\.(eot|ttf|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            type: 'asset/resource',
        }],
    },
    externals: [{
        '@infomaniak/jitsi-meet-electron-sdk': 'require(\'@infomaniak/jitsi-meet-electron-sdk\')',
    }],
    node: {
        __filename: false,
        __dirname: false,
    },
    target: 'web',
});
