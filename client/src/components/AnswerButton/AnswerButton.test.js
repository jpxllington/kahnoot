import { AnswerButton } from ".";
import { screen } from "@testing-library/react";
import './style.css'



describe("AnswerButton", () => {

    test("it renders AnswerButton", () => {
        render(<AnswerButton />);
        let answerButton = screen.getByRole("answerButton");
        expect(answerButton).toBeInTheDocument();
    });

})