import { GameTimer } from ".";
import { screen } from "@testing-library/react";


describe("GameTimer", () => {

    beforeEach(() => {
        renderWithReduxProvider(<GameTimer />);
    });

    test("it renders a timer", () => {
            let timer = screen.getByRole("timer");
            expect(timer.style.background).toBe("red");
    });

})