// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

import {START_UPDATE_DOWNLOAD_MANUAL} from 'common/communication';
import LoadingWrapper from 'renderer/components/SaveButton/LoadingWrapper';

import type {DownloadedItem} from 'types/downloads';

import Thumbnail from '../Thumbnail';

type OwnProps = {
    item: DownloadedItem;
    appName: string;
}

const UpdateAvailable = ({item, appName}: OwnProps) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isProcessing) {
            return;
        }
        setIsProcessing(true);
        e?.preventDefault?.();
        window.desktop.downloadsDropdown.startUpdateDownload();
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
                        defaultMessage={`A new version of the {appName} Desktop App (version ${item.filename}) is available to install.`}
                        values={{
                            version: item.filename,
                            appName,
                        }}
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
                    className='primary-button DownloadsDropdown__Update__Details__Button'
                    variant='primary'
                    onClick={onButtonClick}
                    disabled={isProcessing}
                >
                    <LoadingWrapper
                        loading={isProcessing}
                        text={(
                            <FormattedMessage
                                id='renderer.downloadsDropdown.Update.Downloading'
                                defaultMessage='Downloading'
                            />
                        )}
                    >
                        <FormattedMessage
                            id='renderer.downloadsDropdown.Update.DownloadUpdate'
                            defaultMessage='Download Update'
                        />
                    </LoadingWrapper>
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
