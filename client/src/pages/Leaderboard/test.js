import {  LeaderBoard } from '.';
import { render, screen } from '@testing-library/react';

describe('Welcome', () => {

    test('It renders the title', () => {
        render(<LeaderBoard />)
        const heading = screen.getByText('Leaderboard')
        expect(heading.textContent).toContain('Leaderboard');
    });

});