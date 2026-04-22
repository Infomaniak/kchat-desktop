// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import da from './da.json';
import de from './de.json';
import el from './el.json';
import en from './en.json';
import es from './es.json';
import fi from './fi.json';
import fr from './fr.json';
import it from './it.json';
import nb from './nb.json';
import nl from './nl.json';
import pl from './pl.json';
import pt from './pt.json';
import sv from './sv.json';

export type Language = {
    value: string;
    name: string;
    order: number;
    url: Record<string, string>;
};

export const languages: Record<string, Language> = {
    da: {
        value: 'da',
        name: 'Dansk',
        order: 0,
        url: da,
    },
    de: {
        value: 'de',
        name: 'Deutsch',
        order: 1,
        url: de,
    },
    el: {
        value: 'el',
        name: 'Ελληνικά',
        order: 2,
        url: el,
    },
    en: {
        value: 'en',
        name: 'English',
        order: 3,
        url: en,
    },
    es: {
        value: 'es',
        name: 'Español',
        order: 4,
        url: es,
    },
    fi: {
        value: 'fi',
        name: 'Suomi',
        order: 5,
        url: fi,
    },
    fr: {
        value: 'fr',
        name: 'Français',
        order: 6,
        url: fr,
    },
    it: {
        value: 'it',
        name: 'Italiano',
        order: 7,
        url: it,
    },
    nb: {
        value: 'nb',
        name: 'Norsk (Bokmål)',
        order: 8,
        url: nb,
    },
    nl: {
        value: 'nl',
        name: 'Nederlands',
        order: 9,
        url: nl,
    },
    pl: {
        value: 'pl',
        name: 'Polski',
        order: 10,
        url: pl,
    },
    pt: {
        value: 'pt',
        name: 'Português',
        order: 11,
        url: pt,
    },
    sv: {
        value: 'sv',
        name: 'Svenska',
        order: 12,
        url: sv,
    },
};
