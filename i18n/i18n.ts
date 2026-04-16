// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import de from './de.json';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import it from './it.json';

export type Language = {
    value: string;
    name: string;
    order: number;
    url: Record<string, string>;
};

export const languages: Record<string, Language> = {
    de: {
        value: 'de',
        name: 'Deutsch',
        order: 0,
        url: de,
    },
    en: {
        value: 'en',
        name: 'English',
        order: 1,
        url: en,
    },
    es: {
        value: 'es',
        name: 'Español',
        order: 2,
        url: es,
    },
    fr: {
        value: 'fr',
        name: 'Français',
        order: 3,
        url: fr,
    },
    it: {
        value: 'it',
        name: 'Italiano',
        order: 4,
        url: it,
    },
};
