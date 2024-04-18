// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

[

    // compiled javascript of call component in webapp
    'https://infomaniak.local.preprod.dev.infomaniak.ch/static/kmeet.js',
].forEach((src) => loadFile(src));

function loadFile(src) {
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
