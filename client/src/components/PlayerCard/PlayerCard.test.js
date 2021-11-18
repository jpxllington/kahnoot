import { PlayerCard } from ".";
import { screen } from "@testing-library/react";

describe("PlayerCard", () => {

    test("it renders username", () => {
        render(<PlayerCard />);
        let username = screen.getByRole("username");
        expect(username).toBeInTheDocument();
    });

})