import { HomePage } from '.';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
jest.mock('axios');



jest.mock('.', () => ({
    ...jest.requireActual('.'),
    handleSubmit: jest.fn().mockReturnValue({
        room : "room_1",//e.target.gameID.value,
        username : "Bob"//e.target.username.value
    }  )

  }))


describe('HomePage', () => {

    beforeEach(() => {
        renderWithProviders(<HomePage />)
        jest.resetAllMocks();
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

    test("gets the username from user", () => {


        const username = screen.getByRole('username')
        const join=screen.getByRole("join")
        userEvent.type(username, "Bob")
        userEvent.click(join);
        expect(username.value).toBe("Bob");
    });

    // test("gets the username from user", () => {
    //     const gameID = screen.getByRole('gameID')
    //     userEvent.type(gameID, "room_1{enter}")
    //     expect(gameID.value).toBe("room_1");
    // });

});