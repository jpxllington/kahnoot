import {  Results } from '.';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Provider } from "react-redux";
import { resultsStore } from '../../store'
import { shallow } from 'enzyme';
import axios from 'axios';
jest.mock('axios');

describe('Results', () => {

    test('it renders', () => {
        render(<Provider store={resultsStore}>
            <Results />
          </Provider>)
        const text = screen.getByRole('p')
        expect(text.textContent).toContain('You scored')

    });

});