// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React, {useState, useEffect, useRef, useCallback} from 'react';

// Exponential backoff (base 3): 15s, 45s, 2m15s, 5min (min: 15s, max: 5min)
const MAX_RETRIES = 4;
const INITIAL_RETRY_DELAY_MS = 15_000;
const MAX_RETRY_DELAY_MS = 5 * 60 * 1000;
const BACKOFF_BASE = 3;

function useRetryWithBackoff(resetKey: unknown) {
    const [hasError, setHasError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const retryCountRef = useRef(retryCount);
    retryCountRef.current = retryCount;

    // Reset state when resetKey changes + cleanup on unmount
    useEffect(() => {
        setRetryCount(0);
        setHasError(false);

        return () => {
            if (retryTimeoutRef.current) {
                clearTimeout(retryTimeoutRef.current);
                retryTimeoutRef.current = null;
            }
        };
    }, [resetKey]);

    // Schedule retry with exponential backoff directly in onError
    const onError = useCallback(() => {
        setHasError(true);

        const currentRetryCount = retryCountRef.current;
        if (currentRetryCount >= MAX_RETRIES) {
            return;
        }

        if (retryTimeoutRef.current) {
            clearTimeout(retryTimeoutRef.current);
        }

        const delay = Math.min(INITIAL_RETRY_DELAY_MS * Math.pow(BACKOFF_BASE, currentRetryCount), MAX_RETRY_DELAY_MS);
        retryTimeoutRef.current = setTimeout(() => {
            setHasError(false);
            setRetryCount((prev) => prev + 1);
        }, delay);
    }, []);

    return {hasError, retryCount, onError};
}

interface ImageWithPlaceholderProps {
    src: string | null;
    className?: string;
    alt: string;
}

const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({
    src,
    className = '',
    alt,
}) => {
    const {hasError, retryCount, onError} = useRetryWithBackoff(src);

    if (!src || hasError) {
        return <span className='ServerButton__initial'>{alt}</span>;
    }

    // Append retry count to URL to bypass browser cache on retry
    let imgSrc = src;
    if (retryCount > 0) {
        const url = new URL(src);
        url.searchParams.set('_retry', String(retryCount));
        imgSrc = url.toString();
    }

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={onError}
        />
    );
};

export default ImageWithPlaceholder;
