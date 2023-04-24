// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {DownloadedItem} from 'types/downloads';

import {FormattedMessage} from 'react-intl';

import {Button} from 'react-bootstrap';

import {START_UPDATE_DOWNLOAD, START_UPDATE_DOWNLOAD_MANUAL} from 'common/communication';

import Thumbnail from '../Thumbnail';

type OwnProps = {
    item: DownloadedItem;
}

const UpdateAvailable = ({item}: OwnProps) => {
    const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault?.();
        window.postMessage({type: START_UPDATE_DOWNLOAD}, window.location.href);
    };

    const onButtonClickManual = (e: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault?.();
        window.postMessage({type: START_UPDATE_DOWNLOAD_MANUAL}, window.location.href);
    };

    const isMac = window.process.platform === 'darwin';

    return (
        <div className='DownloadsDropdown__Update'>
            <Thumbnail item={item}/>
            <div className='DownloadsDropdown__Update__Details'>
                <div className='DownloadsDropdown__Update__Details__Title'>
                    <FormattedMessage
                        id='renderer.downloadsDropdown.Update.NewDesktopVersionAvailable'
                        defaultMessage='New Desktop version available'
                    />
                </div>
                <div className='DownloadsDropdown__Update__Details__Description'>
                    <FormattedMessage
                        id='renderer.downloadsDropdown.Update.ANewVersionIsAvailableToInstall'
                        defaultMessage={`A new version of the kChat Desktop App (version ${item.filename}) is available to install.`}
                        values={{version: item.filename}}
                    />
                </div>
                {isMac && (
                    <div className='DownloadsDropdown__Update__Details__DescriptionManual'>
                        <FormattedMessage
                            id='renderer.downloadsDropdown.Update.automaticOrManual'
                            defaultMessage={'*If you are seeing this popup repeatedly after downloading and restarting through the app, please download it using the manual option instead.'}
                        />
                    </div>
                )}
                <Button
                    id='downloadUpdateButton'
                    className='primary-button'
                    onClick={onButtonClick}
                >
                    <FormattedMessage
                        id='renderer.downloadsDropdown.Update.DownloadUpdate'
                        defaultMessage='Download Update'
                    />
                </Button>
                {isMac && (
                    <Button
                        id='manualUpdateButton'
                        className='secondary-button'
                        onClick={onButtonClickManual}
                    >
                        <FormattedMessage
                            id='renderer.downloadsDropdown.Update.ManualUpdate'
                            defaultMessage='Manual Update'
                        />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default UpdateAvailable;
