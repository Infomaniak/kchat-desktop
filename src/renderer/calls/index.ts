// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable import/no-commonjs */

import path from 'path';

import {EventEmitter} from 'events';

class CallRenderer extends EventEmitter {
    private callWindow: any;

    constructor() {
        super();

        this.openNewWindow = this.openNewWindow.bind(this);
        this.load = this.load.bind(this);
    }

    /**
     * Opens a new window
     */
    openNewWindow() {
        // logInfo('new window');
        // this._api.on('largeVideoChanged', this._updateLargeVideoSrc);
        // this._api.on('prejoinVideoChanged', this._updateLargeVideoSrc);
        // this._api.on('videoMuteStatusChanged', this._updateLargeVideoSrc);

        this.callWindow = window.open('', 'CallWindow');
        this.callWindow.callAPI = {
            onload: this.load,

            // dismiss: this.dismiss,
        };

        // const cssPath = path.join(__dirname, './alwaysontop.css');
        const jsPath = path.join(__dirname, './call.js');

        // Add the markup for the JS to manipulate and load the CSS.
        this.callWindow.document.body.innerHTML = `
        <div id="react"></div>
        `;

        // <link rel="stylesheet" href="file://${cssPath}">

        // JS must be loaded through a script tag, as setting it through
        // inner HTML maybe not trigger script load.
        const scriptTag = this.callWindow.document.createElement('script');

        scriptTag.setAttribute('src', `file://${jsPath}`);
        this.callWindow.document.head.appendChild(scriptTag);
    }

    load() {
        console.log('load from renderer');
    }

    /**
     * Handler for state updates
     *
     * @param {string} state updated state
     * @param {Object} data ancillary data to the event
     */
    handleStateChange(state: string, _: any) {
        console.log(`handling ${state} state update from main process`);

        switch (state) {
        case 'call-open':
            this.openNewWindow();
            break;

        // case STATES.SHOW:
        //     this._showWindow();
        //     break;
        default:
            break;
        }
    }
}

/**
* Initializes
*
* @param {Object} options - options.
*/
module.exports = () => {
    return new CallRenderer();
};
