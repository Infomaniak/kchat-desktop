// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React, {useState} from 'react';

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
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return <span className='ServerButton__initial'>{alt}</span>;
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setHasError(true)}
        />
    );
};

export default ImageWithPlaceholder;
