// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
const {spawnSync} = require('child_process');
const fs = require('fs/promises');
const path = require('path');

const {flipFuses, FuseVersion, FuseV1Options} = require('@electron/fuses');

const SETUID_PERMISSIONS = '4755';

function fixSetuid(context) {
    return async (target) => {
        if (!['appimage', 'snap'].includes(target.name.toLowerCase())) {
            const result = await spawnSync('chmod', [SETUID_PERMISSIONS, path.join(context.appOutDir, 'chrome-sandbox')]);
            if (result.error) {
                throw new Error(
                    `Failed to set proper permissions for linux arch on ${target.name}: ${result.error} ${result.stderr} ${result.stdout}`,
                );
            }
        }
    };
}

function getAppFileName(context) {
    switch (context.electronPlatformName) {
    case 'win32':
        return 'kChat.exe';
    case 'darwin':
    case 'mas':
        return 'kChat.app';
    case 'linux':
        return context.packager.executableName;
    default:
        return '';
    }
}

exports.default = async function afterPack(context) {
    try {
        await flipFuses(
            `${context.appOutDir}/${getAppFileName(context)}`, // Returns the path to the electron binary
            {
                version: FuseVersion.V1,
                [FuseV1Options.RunAsNode]: false, // Disables ELECTRON_RUN_AS_NODE
            });

        if (context.electronPlatformName === 'linux') {
            context.targets.forEach(fixSetuid(context));
        }

        // macOS needs to add the Assets.car containing the Liquid Glass icon
        if (process.platform === 'darwin') {
            await copyAssetsCar(context.appOutDir).
                then(() => true).
                catch(() => false);
        }
    } catch (error) {
        console.error('afterPack error: ', error);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }
};

/** @type {(appOutDir: string) => Promise<void>} */
async function copyAssetsCar(appOutDir) {
    console.log('\nCopying Assets.car file for macOS');

    // Get the directory of the current project
    const dirname = process.cwd();

    // Get the path to the app by finding the first directory that ends with `.app`
    const appContents = await fs.readdir(appOutDir);
    const appName = appContents.find((item) => item.endsWith('.app'));
    if (!appName) {
        console.log('No .app directory found in appOutDir, skipping Assets.car copy');
        return;
    }
    const appPath = path.join(appOutDir, appName);

    // Craft the source and target paths
    const sourcePath = path.join(dirname, 'build', 'Assets.car');
    const targetPath = path.join(appPath, 'Contents', 'Resources', 'Assets.car');

    // Log for debugging
    console.log(`Source path: ${sourcePath}`);
    console.log(`Target path: ${targetPath}`);

    // Copy the file from the source to the target
    try {
        await fs.copyFile(sourcePath, targetPath);
        console.log(`Successfully copied Assets.car to ${targetPath}`);
    } catch (error) {
        console.error(`Failed to copy Assets.car: ${error.message}`);
        throw error;
    }
}
