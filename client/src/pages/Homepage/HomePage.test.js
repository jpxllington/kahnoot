import {  Homepage } from '.';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { shallow } from 'enzyme';
import axios from 'axios';
jest.mock('axios');

describe('Homepage', () => {

    test('it renders', () => {
        render(<Homepage />)
        const heading = screen.getByRole('heading')
        expect(heading.textContent).toContain('Kahnoot')
        // const heading = screen.getByText('Leaderboard')
        // expect(heading.textContent).toContain('Leaderboard');
    });

});