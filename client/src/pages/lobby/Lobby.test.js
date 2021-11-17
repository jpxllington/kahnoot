import {  Lobby } from '.';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { shallow } from 'enzyme';
import axios from 'axios';
jest.mock('axios');

describe('Lobby', () => {

    test('it renders', () => {
        render(<Lobby />)
        const heading = screen.getByRole('button')
        expect(heading.textContent).toContain('Go to quiz')

    });

});