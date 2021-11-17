import { HomePage } from '.';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { shallow } from 'enzyme';
import axios from 'axios';
jest.mock('axios');
import 'core-js';
import setimmediate from 'setimmediate';

describe('HomePage', () => {

    beforeEach(() => {
        renderWithProviders(<HomePage />)
    });

    test('it renders', () => {
        const heading = screen.getByRole('heading')
        expect(heading.textContent).toContain('Kahnoot')
        // const heading = screen.getByText('Leaderboard')
        // expect(heading.textContent).toContain('Leaderboard');
    });

    test('it renders the buttons', () => {
        const join = screen.getByRole('join');
        const create = screen.getByRole('create');

        expect(join.value).toBe("Join Game");
        expect(create.value).toBe("Create Game");

    });

});