import { Lobby } from '.';
import { screen } from '@testing-library/react';

describe('Lobby', () => {

    beforeEach(() => {
        renderWithProviders(<Lobby />)
    });


    test('it renders', () => {
        const quiz = screen.getByRole('quiz');
        expect(quiz.textContent).toContain('quiz');

    });

    // test('it calls playerCard' , () => {
    //     const playerCard = screen.getByRole('playerCard');
    //     expect(playerCard).toBeInTheDocument();
    // })

});
