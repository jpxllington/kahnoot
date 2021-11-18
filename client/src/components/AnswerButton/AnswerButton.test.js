import { AnswerButton } from ".";
import { screen } from "@testing-library/react";

describe("AnswerButton", () => {

    test("it renders AnswerButton", () => {
        render(<AnswerButton />);
        let answerButton = screen.getByRole("answerButton");
        expect(answerButton).toBeInTheDocument();
    });

})