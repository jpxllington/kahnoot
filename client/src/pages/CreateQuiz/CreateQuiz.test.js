import { CreateQuiz } from '.';
import { screen } from '@testing-library/react';
import axios from 'axios';
jest.mock('axios');

describe('CreateQuiz', () => {

    beforeEach(() => {
        renderWithProviders(<CreateQuiz />)
    });

    test('it renders', () => {
        const quiz = screen.getByRole('quiz')
        expect(quiz.value).toBe('Generate Quiz')

    });


    test('Category value is set properly when render the page', () => {
        const category = screen.getByRole('select_topic');
        expect(category.value).toBe(""); //"General Knowledge"

    });

    test('Difficulty value is set properly when render the page', () => {
        const difficulty = screen.getByRole("select_difficulty");
        expect(difficulty.value).toBe("easy");
    });


});