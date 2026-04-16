#!/usr/bin/env node
// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

'use strict';

const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const isCI = process.argv.includes('--ci');

const I18N_DIR = path.resolve(__dirname, '../i18n');
const mainLangFile = path.join(I18N_DIR, 'en.json');
const targetLangs = ['de', 'es', 'fr', 'it'];
const otherLangFiles = targetLangs.map((lang) => path.join(I18N_DIR, `${lang}.json`));

function runI18nExtract() {
    try {
        execSync('npm run i18n-extract', {stdio: 'inherit'});
    } catch {
        console.error('\n⛔ i18n extract failed.');
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }

    try {
        execSync('git diff --exit-code i18n/en.json', {stdio: 'pipe'});
    } catch {
        console.error('\n⛔ i18n/en.json has changed after extract. Commit the updated file.');
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }
}

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeJson(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

function getLangStatus(enKeys, langFile) {
    const lang = path.basename(langFile, '.json');
    if (!fs.existsSync(langFile)) {
        return {lang, missing: [], extra: [], missingFile: true};
    }

    const data = readJson(langFile);
    const keys = Object.keys(data);
    return {
        lang,
        data,
        missingFile: false,
        missing: enKeys.filter((k) => !keys.includes(k)),
        extra: keys.filter((k) => !enKeys.includes(k)),
    };
}

function cleanExtraKeys(langFile, data, extraKeys) {
    extraKeys.forEach((k) => delete data[k]);
    writeJson(langFile, data);
    console.log(`🧹 Cleaned ${extraKeys.length} extra key(s) from ${path.basename(langFile)}`);
}

function checkAndCleanTranslations() {
    const en = readJson(mainLangFile);
    const enKeys = Object.keys(en);
    let failed = false;
    let hasChanges = false;

    otherLangFiles.forEach((langFile) => {
        const {lang, data, missing, extra, missingFile} = getLangStatus(enKeys, langFile);

        if (missingFile) {
            console.error(`⛔ Missing translation file: ${langFile}`);
            failed = true;
            return;
        }

        if (missing.length > 0) {
            console.error(`⛔ ${lang}.json is missing ${missing.length} key(s):\n  - ${missing.join('\n  - ')}`);
            failed = true;
        }

        if (extra.length > 0) {
            console.log(`🔍 ${lang}.json has ${extra.length} extra key(s):\n  - ${extra.join('\n  - ')}`);
            if (isCI) {
                hasChanges = true;
            } else {
                cleanExtraKeys(langFile, data, extra);
            }
        }
    });

    if (failed || hasChanges) {
        if (isCI && hasChanges) {
            console.error('\n⛔ CI mode: extra keys found in translation files. Run `node scripts/check-i18n.js` locally to clean them.');
        }
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }
}

function main() {
    runI18nExtract();
    checkAndCleanTranslations();
    console.log('\n✅ Translations are clean and up-to-date!');
}

main();
