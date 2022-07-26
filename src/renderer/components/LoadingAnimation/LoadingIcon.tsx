// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

/**
 * A function component for inlining SVG code for animation logo loader
 */
function LoadingAnimation() {
    return (
        <svg
            width='60'
            height='60'
            viewBox='0 0 60 60'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M72 0H8C3.58172 0 0 3.58172 0 8V72C0 76.4183 3.58172 80 8 80H72C76.4183 80 80 76.4183 80 72V8C80 3.58172 76.4183 0 72 0Z'
                fill='#0098FF'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M17.0667 66.88H33.7067V56L39.7809 50.1431L48.4267 66.88H66.8267L50.5999 39.7819L65.8667 25.2796H45.8667L33.7067 39.0397V0H17.0667V66.88Z'
                fill='white'
            />
        </svg>
    );
}

export default LoadingAnimation;
