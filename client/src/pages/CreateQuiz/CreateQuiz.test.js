import {  CreateQuiz } from '.';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { shallow } from 'enzyme';
import axios from 'axios';
jest.mock('axios');

describe('CreateQuiz', () => {

    test('it renders', () => {
        render(<CreateQuiz />)
        const heading = screen.getByRole('button')
        expect(heading.textContent).toContain('Go to quiz')

    });


    test('Category value is set properly when render the page',  () => {
        render(<CreateQuiz />)
        const category = screen.getByRole('select_topic');
        expect(category.value).toBe("General Knowledge");

    });

    test('Difficulty value is set properly when render the page',  () => {
        render(<CreateQuiz />)
        const difficulty = screen.getByRole("select_difficulty");     
        expect(difficulty.value).toBe("Easy");
    });


});