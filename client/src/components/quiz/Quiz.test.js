import { Quiz } from ".";
import { render, screen } from "@testing-library/react";


describe("Quiz", () => {
    
    test("it renders quiz", () => {
            render(<Quiz answers={['Silver','Gold','Bronz']}/>)
            const timer = screen.getByRole("timer");
            expect(timer).toBeInTheDocument();

            const answers_form = screen.getByRole("answers-form");
            expect(answers_form).toBeInTheDocument();
    });

})