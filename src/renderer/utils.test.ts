// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

'use strict';

jest.mock('pretty-bytes', () => ({
    __esModule: true,
    default: jest.fn((bytes: number) => `${bytes} B`),
}));

import {initialForTeam} from 'renderer/components/ServersSidebar/utils';
import {getInitialsFromName} from 'renderer/utils';

describe('getInitialsFromName', () => {
    const testCases: Array<{input: string; expected: string; reason: string}> = [
        {
            input: 'Jean Dupont',
            expected: 'JD',
            reason: 'multiple words: first letter of first 2 words',
        },
        {
            input: 'Dupont',
            expected: 'DU',
            reason: 'single word, >1 char: first + second letter',
        },
        {
            input: 'ik',
            expected: 'IK',
            reason: 'single word, 2 chars: first + second letter',
        },
        {
            input: 'Jean-Pierre',
            expected: 'JP',
            reason: 'hyphenated name: first letter of each part',
        },
        {
            input: 'A',
            expected: 'A',
            reason: 'single char: just that char',
        },
        {
            input: 'AB',
            expected: 'AB',
            reason: '2 chars: first + second',
        },
        {
            input: 'A B C',
            expected: 'AB',
            reason: '3+ words: first 2 words only',
        },
        {
            input: '  Trimmed  Name  ',
            expected: 'TN',
            reason: 'extra whitespace is trimmed',
        },
        {
            input: '',
            expected: '',
            reason: 'empty string',
        },
        {
            input: '   ',
            expected: '',
            reason: 'only whitespace',
        },
        {
            input: "O'Brien",
            expected: 'OB',
            reason: 'apostrophied name: first letter of each part',
        },
        {
            input: 'lowercase NAME',
            expected: 'LN',
            reason: 'result always uppercase',
        },
    ];

    testCases.forEach(({input, expected, reason}) => {
        it(`should handle ${reason}: "${input}" -> "${expected}"`, () => {
            expect(getInitialsFromName(input)).toBe(expected);
        });
    });
});

describe('initialForTeam', () => {
    it('should return "IK" for Infomaniak team name', () => {
        const team = {name: 'Infomaniak', id: '1', display_name: 'Infomaniak', url: 'https://example.com', last_team_icon_update: '0'};
        expect(initialForTeam(team)).toBe('IK');
    });

    it('should return "??" for undefined team', () => {
        expect(initialForTeam(undefined)).toBe('??');
    });

    it('should fallback to getInitialsFromName for non-Infomaniak teams', () => {
        const team1 = {name: 'Test', id: '1', display_name: 'Test', url: 'https://example.com', last_team_icon_update: '0'};
        expect(initialForTeam(team1)).toBe('TE');

        const team2 = {name: 'Team Name', id: '2', display_name: 'Team Name', url: 'https://example.com', last_team_icon_update: '0'};
        expect(initialForTeam(team2)).toBe('TN');
    });
});
