// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
/* eslint-disable no-console */

import fs from 'fs';

import {IpcMainEvent, net, session, ipcMain, safeStorage} from 'electron';

import log from 'electron-log';

import {UPDATE_PATHS} from 'common/communication';

import {tokensStorePath} from './constants';
import {tokenApiEndpoint} from '../common/config/ikConfig'
import * as Validator from '../common/Validator';

type Token = {
    token: string;
    refreshToken?: string;
    encrypted?: boolean;
    // expiresAt: number;
}

type EncryptedToken = Token & {
    encrypted: boolean;
}

export class TokenManager {
    tokenApiEndpoint: string;
    clientID: string;
    storeFile: string;
    data: Token | Record<string, never>;
    requestPromise: Promise<Token> | void;
    revokePromise: Promise<any> | void;
    safeStorageAvailable: boolean

    constructor(tokensStorePath: string) {
        this.clientID = 'A7376A6D-9A79-4B06-A837-7D92DB93965B';
        this.tokenApiEndpoint = tokenApiEndpoint;

        this.storeFile = tokensStorePath;
        this.data = {};
        this.requestPromise = undefined;
        this.revokePromise = undefined;
        this.safeStorageAvailable = safeStorage.isEncryptionAvailable()
    }

    load = (): Promise<Token | Error | Record<string, never>> => {
        return new Promise((resolve, reject) => {
            let storeStr;
            try {
                storeStr = fs.readFileSync(tokensStorePath, 'utf-8');
                let jsonData = (typeof storeStr === 'object'
                    ? storeStr
                    : JSON.parse(storeStr));

                jsonData = Validator.validateTokensStore(jsonData);

                if (!jsonData) {
                    reject(new Error('Provided tokens store file does not validate, using defaults instead.'));
                }

                if ('encrypted' in jsonData) {
                    this.data = this.decrypt(jsonData);
                } else {
                    this.encrypt(jsonData)
                }

                // const tokenExpired = this.checkValidity();
                // if (tokenExpired) {
                //     this.handleRefreshToken().then((token) => resolve(token));
                // } else {
                //     resolve(this.data);
                // }

                resolve(this.data);
            } catch (e) {
                this.data = {};
            }

            return this.data;
        });
    }

    // Returns if token is still valid.
    // checkValidity = () => {
    //     if (!this.data.refreshToken) {
    //         throw new Error('missing refresh token');
    //     }

    //     console.log(Date.now() / 1000);
    //     console.log(this.data.expiresAt);

    //     const isExpired = this.data.expiresAt <= (Date.now() / 1000);
    //     console.log('isExpired', isExpired);
    //     return isExpired;
    // }

    // Returns available token data.
    getToken = () => {
        return this.data;
    }

    // Store token from api response and write to disk.
    handleStoreToken = (_: IpcMainEvent, message: Token) => {

        // refreshToken: message.refreshToken,
        // expiresAt: message.expiresAt,
        // refreshToken: message.refreshToken,

        this.data = this.encrypt(message);

        log.silly('tokenManager.handleStoreToken');
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
        if (this.requestPromise) {
            return this.requestPromise as Promise<Token>;
        }

        this.requestPromise = new Promise((resolve, reject) => {
            log.silly('handleRefreshToken.handleRefresh.newPromise');

            if (!this.data.token || !this.data.refreshToken) {
                reject(new Error('refresh failed because token or refresh token is missing'));
            }

            // only allow refresh once.
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

            req.on('response', (response: Electron.IncomingMessage) => {
                log.silly('handlePostToken.response', response);

                if (response.statusCode === 200) {
                    response.on('data', (chunk: Buffer) => {
                        log.silly('handlePostToken.response.data', `${chunk}`);
                        const raw = `${chunk}`;
                        try {
                            const data = JSON.parse(raw) as Record<string, string>;
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            const { access_token, expires_in, refresh_token } = data;
                            this.data = {
                                token: access_token,
                                refreshToken: refresh_token,
                                expiresAt: (Date.now() / 1000) + parseInt(expires_in, 10),
                            } as Token;
                            this.save();
                            if (callback) {
                                callback(this.data);
                            }
                            this.requestPromise = undefined;
                            resolve(this.data);
                        } catch (e) {
                            const error = `Error parsing server data from ${this.tokenApiEndpoint}`;
                            log.error(error);
                            if (callback) {
                                callback(error);
                            }
                            this.requestPromise = undefined;
                            reject(error);
                        }
                    });
                } else {
                    const error = new Error(`Bad status code requesting from token refresh ${JSON.stringify(response)}`);
                    log.error(error);
                    this.reset();
                    if (callback) {
                        callback(error);
                    }
                    this.requestPromise = undefined;
                    reject(error);
                }
                response.on('error', (() => { }));
            });
            req.on('abort', () => {
                const error = new Error('token refresh aborted');
                this.requestPromise = undefined;
                reject(error);
            });
            req.on('error', (e: Error) => {
                this.requestPromise = undefined;
                reject(e);
            });

            // Using form-data since login doesn't support json yet.
            req.setHeader('Content-Type', 'application/x-www-form-urlencoded');

            req.write(data.toString());
            req.end();
        });

        return this.requestPromise;
    }

    // Revoke existing token
    handleRevokeToken = (callback?: (...args: any[]) => void) => {
        log.silly('tokenManager.handleRevokeToken');

        // only allow revoke once.
        if (this.revokePromise) {
            return this.revokePromise as Promise<any>;
        }

        this.revokePromise = new Promise<void>((resolve, reject) => {
            if (!this.data.token) {
                reject(new Error('no token to revoke'));
            }

            const req = net.request({
                url: this.tokenApiEndpoint,
                session: session.defaultSession,
                useSessionCookies: false,
                method: 'DELETE',
            });

            req.on('response', (response: Electron.IncomingMessage) => {
                log.silly('handleRevokeToken.response', response);

                if (response.statusCode === 200) {
                    this.reset();
                    if (callback) {
                        callback();
                    }
                    this.revokePromise = undefined;
                    resolve();
                } else {
                    const error = new Error(`Bad status code requesting from token revoke ${JSON.stringify(response)}`);
                    log.error(error);
                    if (callback) {
                        callback(error);
                    }
                    this.revokePromise = undefined;
                    reject(error);
                }
                response.on('error', (() => {
                    this.revokePromise = undefined;
                    reject(new Error('handleRevokeToken.responseError'));
                }));
            });
            req.on('abort', () => {
                const error = new Error('handleRevokeToken.req.abort');
                this.revokePromise = undefined;
                reject(error);
            });
            req.on('error', (e: Error) => {
                this.revokePromise = undefined;
                reject(e);
            });

            log.silly('deleting token');
            req.setHeader('Authorization', `Bearer ${this.data.token}`);
            session.defaultSession.clearStorageData();

            req.end();
        });

        return this.revokePromise;
    }

    encrypt = (tokenObj: Token): Token => {
        if (!this.safeStorageAvailable) {
            if (tokenObj.encrypted) {
                delete tokenObj.encrypted;
            }
            return tokenObj
        }

        try {
            const encryptedString = safeStorage.encryptString(tokenObj.token)
            return {
                token: encryptedString.toString('base64'),
                encrypted: true
            }
        } catch (error) {
            log.error('Token encryption did not work', error)
            if (tokenObj.encrypted) {
                delete tokenObj.encrypted;
            }
            return tokenObj
        }
    }

    decrypt = (tokenObj: EncryptedToken): EncryptedToken => {
        if (!this.safeStorageAvailable) {
            throw new Error('token can not be decrypted, safestorage not available');
        }

        try {
            const buffer = Buffer.from(tokenObj.token, 'base64')
            return {
                ...tokenObj,
                token: safeStorage.decryptString(buffer)
            }
        } catch (error) {
            log.error('Token decryption did not work', error)
            return tokenObj
        }

    }
}

let tokenManager = new TokenManager(tokensStorePath);
export default tokenManager;

ipcMain.on(UPDATE_PATHS, () => {
    tokenManager = new TokenManager(tokensStorePath);
});
