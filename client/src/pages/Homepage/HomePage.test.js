import { HomePage } from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
jest.mock('axios');

const handleSubmit = (e) => { 
    let room = e.target.gameID.value;
    let username = e.target.username.value;
    dispatch(setRoom(username, room))
}



describe('HomePage', () => {

    beforeEach(() => {
        renderWithProviders(<HomePage />)
    });

    test('it renders', () => {
        const heading = screen.getByRole('heading')
        expect(heading.textContent).toContain('Kahnoot')

    });

    test('it renders the buttons', () => {
        const join = screen.getByRole('join');
        const create = screen.getByRole('create');
        const username = screen.getByRole('username');
        const gameId = screen.getByRole('gameID');

        expect(join.value).toBe("Join Game");
        expect(create.value).toBe("Create Game");
        expect(username).toBeInTheDocument();
        expect(gameId).toBeInTheDocument();

    });

    test('it renders the form', () => {
        const form = screen.getByRole('form');

        expect(form).toBeInTheDocument();
    });

    // test("gets the username from user", () => {
    //     jest.resetAllMocks();
    //     axios.get.mockResolvedValue({handleSubmit})
    //     const username = screen.getByRole('username')
    //     userEvent.type(username, "Bob{enter}")
    //     expect(username.value).toBe("Bob");
    // });

    // test("gets the username from user", () => {
    //     jest.resetAllMocks();
    //     axios.get.mockResolvedValue({handleSubmit})
    //     const gameID = screen.getByRole('gameID')
    //     userEvent.type(gameID, "room_1{enter}")
    //     expect(gameID.value).toBe("room_1");
    // });

});