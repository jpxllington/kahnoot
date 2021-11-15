import {  Leaderboard } from '.';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
jest.mock('axios');

describe('Leaderboard', () => {

    const data = [
        {"id":"1","username":"Bob","category":"General Knowledge","difficulty":"Easy","score":9},
    {"id":"2","username":"Kelly","category":"General Knowledge","difficulty":"Easy","score":6},
    {"id":"3","username":"Emma","category":"General Knowledge","difficulty":"Easy","score":7},
    {"id":"4","username":"Alex","category":"History","difficulty":"Easy","score":4},
    {"id":"5","username":"Tom","category":"Sports","difficulty":"Easy","score":10}
    ]

    test('It renders the title', () => {
        render(<Leaderboard />)
        const heading = screen.getByText('Leaderboard')
        expect(heading.textContent).toContain('Leaderboard');
    });

    test('it makes a request to the api on load and renders players data',  () => {
        const difficulty = screen.getByRole("form");
        const category = screen.getByRole('selectCategory');
        expect(difficulty.value).toBe("Difficulty");
        expect(category.value).toBe("Test topic");
        // axios.get.mockResolvedValue({ data: data });
        // render(<Leaderboard />);

    });

});