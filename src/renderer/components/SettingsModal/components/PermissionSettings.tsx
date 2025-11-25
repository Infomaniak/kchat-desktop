// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React, {useEffect, useState} from 'react';
import {useIntl, FormattedMessage} from 'react-intl';

import type {Permissions} from 'types/permissions';

import './PermissionSettings.scss';

type Permission = {
    name: string; allowed: boolean;
}
export const PermissionSettings = () => {
    const [permissions, setPermissions] = useState<Permission[]>([]);

    useEffect(() => {
        (async () => {
            const perms = await window.desktop.getLocalPermissions();
            setPermissions(convertPermissionDataToState(perms));
        })();
    }, []);

    const convertPermissionDataToState = (perms: Permissions) => {
        return Object.entries(perms).map(([name, {allowed}]) => {
            return {name, allowed};
        });
    };

    const refreshPermission = (permission: string) => {
        window.desktop.refreshPermission(permission).then((allowed) => {
            setPermissions((prevPermissions) =>
                prevPermissions.map((perm) =>
                    (perm.name === permission ? {...perm, allowed} : perm),
                ),
            );
        });
    };

    return (<div>
        <h3 className='PermissionSetting__heading'>
            <FormattedMessage
                id='renderer.components.settingsPage.permissions.title'
                defaultMessage='Permissions'
            />
        </h3>
        <div className='PermissionSetting__label'>
            <FormattedMessage
                id='renderer.components.settingsPage.permissions.label'
                defaultMessage='Review and update the permissions you’ve set for this app'
            />
        </div>
        <div className='PermissionSetting__content'>
            {permissions.map((perm) => (
                <Permission
                    key={perm.name}
                    name={perm.name}
                    allowed={perm.allowed}
                    onReset={() => refreshPermission(perm.name)}
                />
            ))}
        </div>
    </div>);
};

const PermissionLabelMapping: Record<string, string> = {
    notifications: 'renderer.components.settingsPage.permissions.notifications',
    geolocation: 'renderer.components.settingsPage.permissions.geolocation',
    screenShare: 'renderer.components.settingsPage.permissions.screenShare',
    media: 'renderer.components.settingsPage.permissions.microphoneAndCamera',
    openExternal: 'renderer.components.settingsPage.permissions.openExternal',

};

const Permission = ({name, allowed, onReset}: {name: Permission['name']; allowed: Permission['allowed']; onReset: (permission: string) => void}) => {
    const {formatMessage} = useIntl();
    const stateKey = allowed ? 'renderer.components.settingsPage.permissions.allowed' : 'renderer.components.settingsPage.permissions.denied';
    const state = capitalize(formatMessage({id: stateKey}));
    const label = formatMessage({id: PermissionLabelMapping[name]}, {allowed: state});
    return (
        <p className='PermissionSetting__content__perm'>
            <label>{label}</label>
            <a
                href='#'
                onClick={() => onReset(name)}
            >
                <FormattedMessage
                    id='renderer.components.settingsPage.permissions.reset'
                    defaultMessage='reset'
                />
            </a>
        </p>);
};

function capitalize(str: string) {
    if (!str) {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
