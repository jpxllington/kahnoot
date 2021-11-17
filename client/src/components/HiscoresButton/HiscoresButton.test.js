import { HiscoresButton } from ".";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


// failing
describe("HiscoresButton", () => {
    test("it renders", () => {
        render(<HiscoresButton />)
        let button = screen.getByRole('button');
        expect(button.textContent).toContain('Go to Hiscores')
    });
})