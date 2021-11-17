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


    test('Values are set properly when render the page',  () => {
        render(<Lobby />)
        const tableInfo=screen.getByRole('display-scores');
        const category = screen.getByRole('select_topic');
        const difficulty = screen.getByRole("select_difficulty");
        
        expect(difficulty.value).toBe("Easy");
        expect(category.value).toBe("General Knowledge");
        expect(tableInfo.textContent).toContain('Username');
    });


});