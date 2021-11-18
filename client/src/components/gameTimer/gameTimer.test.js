import { GameTimer } from ".";
import { screen } from "@testing-library/react";


describe("GameTimer", () => {

    test("it renders gametimer", () => {
        render(<GameTimer />);
        let timer = screen.getByRole("timer");
        expect(timer).toBeInTheDocument();
    });

})