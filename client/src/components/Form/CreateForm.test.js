import { CreateForm } from ".";
import { screen } from "@testing-library/react";

describe("CreateForm", () => {

    beforeEach(() => {
        renderWithReduxProvider(<CreateForm />);
    });

    test("it renders a form", () => {
            let form = screen.getByRole("generate_quiz");
            expect(form).toBeInTheDocument();
    });

    test("it renders a category", () => {
        let category = screen.getByRole("select_topic");
        expect(category).toBeInTheDocument();
    });


    test("it renders a number of questions option", () => {
        let numberOfQuestions = screen.getByRole("set_nuumber");
        expect(numberOfQuestions).toBeInTheDocument();
    });

});