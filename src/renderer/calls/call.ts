// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

function loadFile(src: string) {
    console.log('src', src);

    if (src.endsWith('.js')) {
        const script = document.createElement('script');

        script.async = true;
        script.src = src;

        document.head.appendChild(script);
    } else if (src.endsWith('.css')) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', src);
        document.head.appendChild(link);
    }
}

window.jitsiNodeAPI.onLoadServerUrl((serverUrl) => {
    loadFile(serverUrl);
});

