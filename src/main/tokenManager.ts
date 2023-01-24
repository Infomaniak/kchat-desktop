// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
/* eslint-disable no-console */

import nodeCrypto from 'crypto';

import fs from 'fs';

import log from 'electron-log';

import {IpcMainEvent, net, session, ClientRequest, ipcMain} from 'electron';

import {UPDATE_PATHS} from 'common/communication';

import {tokensStorePath} from './constants';

type Token = {
    token: string;
    refreshToken: string;
    expiresAt: number;
}

export class TokenManager {
    tokenApiEndpoint: string;
    tokenProvisioningEndpoint: string;
    clientID: string;
    storeFile: string;
    data: Token | Record<string, never>;

    constructor(tokensStorePath: string) {
        this.clientID = 'A7376A6D-9A79-4B06-A837-7D92DB93965B';
        this.tokenApiEndpoint = 'https://login.preprod.dev.infomaniak.ch/token';

        // &code_challenge=${codeChallenge}
        this.tokenProvisioningEndpoint =
            `https://login.preprod.dev.infomaniak.ch/authorize?access_type=offline&code_challenge_method=S256&client_id=${this.clientID}&response_type=code`;
        this.storeFile = tokensStorePath;
        this.data = {};
    }

    load = (): Promise<Token | Error> => {
        // this.storeFile = tokensStorePath;
        return new Promise((resolve, reject) => {
            let storeStr;
            try {
                // const result = Validator.validateCertificateStore(storeStr);

                console.log(tokensStorePath);
                storeStr = fs.readFileSync(tokensStorePath, 'utf-8');
                const jsonData = (typeof storeStr === 'object' ? storeStr as Token : JSON.parse(storeStr) as Token);
                if (!jsonData) {
                    reject(new Error('Provided tokens store file does not validate, using defaults instead.'));
                }
                this.data = jsonData;
                const tokenExpired = this.checkValidity();
                if (tokenExpired) {
                    this.handleRefreshToken(resolve);
                } else {
                    resolve(this.data);
                }
            } catch (e) {
                this.data = {};
            }

            return this.data;
        });
    }

    // Returns if token is still valid.
    checkValidity = () => {
        if (!this.data.refreshToken) {
            throw new Error('missing refresh token');
        }

        const isExpired = this.data.expiresAt <= Date.now() / 1000;
        return !isExpired;
    }

    // Returns available token data.
    getToken = () => {
        return this.data;
    }

    // Store token from api response and write to disk.
    handleStoreToken = (_: IpcMainEvent, message: Token) => {
        this.data = {
            token: message.token,
            refreshToken: message.refreshToken,
            expiresAt: message.expiresAt,
        };

        this.save();
    }

    // Write token data to disk.
    save = () => {
        fs.writeFileSync(this.storeFile, JSON.stringify(this.data, null, '  '));
    };

    reset = () => {
        this.data = {};
        this.save();
    }

    // Setup api request for token refresh.
    handleRefreshToken = (callback?: (...args: any[]) => void) => {
        const data = new URLSearchParams();
        data.append('grant_type', 'refresh_token');
        data.append('refresh_token', this.data.refreshToken as string);
        data.append('client_id', this.clientID);

        const req = net.request({
            url: this.tokenApiEndpoint,
            session: session.defaultSession,
            useSessionCookies: false,
            method: 'POST',
        });

        this.handlePostToken(req, data, callback);
    }

    // Do token api request.
    handlePostToken = (req: ClientRequest, data: URLSearchParams, callback?: (...args: any[]) => void) => {
        req.on('response', (response: Electron.IncomingMessage) => {
            log.silly('handlePostToken.response', response);

            if (response.statusCode === 200) {
                response.on('data', (chunk: Buffer) => {
                    log.silly('handlePostToken.response.data', `${chunk}`);
                    const raw = `${chunk}`;
                    try {
                        const data = JSON.parse(raw) as Record<string, string>;
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        const {access_token, expires_in, refresh_token} = data;
                        this.data = {
                            token: access_token,
                            refreshToken: refresh_token,
                            expiresAt: (Date.now() / 1000) + parseInt(expires_in, 10),
                        } as Token;
                        this.save();
                        if (callback) {
                            callback(this.data);
                        }
                    } catch (e) {
                        const error = `Error parsing server data from ${this.tokenApiEndpoint}`;
                        log.error(error);
                        if (callback) {
                            callback(error);
                        }
                    }
                });
            } else {
                const error = new Error(`Bad status code requesting from token refresh ${JSON.stringify(response)}`);
                log.error(error);
                this.reset();
                if (callback) {
                    callback(error);
                }
            }
            response.on('error', (() => {}));
        });
        req.on('abort', () => console.log('token refresh aborted'));
        req.on('error', (e: Error) => {
            console.log(e);
        });

        // Using form-data since login doesn't support json yet.
        req.setHeader('Content-Type', 'application/x-www-form-urlencoded');

        req.write(data.toString());
        req.end();
    }

    /**
     * get code_verifier for challenge
     * @returns string
     */
    // getCodeVerifier = () => {
    //     const ramdonByte = nodeCrypto.randomBytes(33);
    //     const hash =
    //         nodeCrypto.createHash('sha256').update(ramdonByte).digest();
    //     return hash.toString('base64').
    //         replace(/\+/g, '-').
    //         replace(/\//g, '_').
    //         replace(/[=]/g, '');
    // }

    /**
     * Generate code_challenge for oauth
     * @param codeVerifier string
     * @returns string
     */
    // generateCodeChallenge = (codeVerifier: string) => {
    //     const hash =
    //         nodeCrypto.createHash('sha256').update(codeVerifier).digest();
    //     return hash.toString('base64').
    //         replace(/\+/g, '-').
    //         replace(/\//g, '_').
    //         replace(/[=]/g, '');
    // }
}

let tokenManager = new TokenManager(tokensStorePath);
export default tokenManager;

ipcMain.on(UPDATE_PATHS, () => {
    tokenManager = new TokenManager(tokensStorePath);
});
