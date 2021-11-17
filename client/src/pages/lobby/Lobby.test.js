import { Lobby } from '.';
import { screen } from '@testing-library/react';

describe('Lobby', () => {

    beforeEach(() => {
        renderWithProviders(<Lobby />)
    });


    test('it renders', () => {
        const button = screen.getByRole('button')
        expect(button.textContent).toContain('Go to quiz')

    });

});