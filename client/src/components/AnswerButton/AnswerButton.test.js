import { AnswerButton } from ".";
import { screen } from "@testing-library/react";
<<<<<<< HEAD
import './style.css'

=======
import "./style.css"
>>>>>>> staging
describe("AnswerButton", () => {

    test("it renders AnswerButton", () => {
        render(<AnswerButton />);
        let answerButton = screen.getByRole("answerButton");
        expect(answerButton).toBeInTheDocument();
    });

})