import { Question } from ".";
import { render, screen } from "@testing-library/react";


describe("Question", () => {
    
    test("it renders questions", () => {
            render(<Question />)
            let question = screen.getByRole("question");
            expect(question).toBeInTheDocument();
    });

})