import { CreateForm } from ".";
import { screen , fireEvent } from "@testing-library/react";

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

    test('Simulates topic selection', () => {
        const { getByTestId, getAllByTestId } = render(<CreateForm />);
        fireEvent.change(getByTestId('select-topic'), { target: { value: "General Knowledge" } })
        let options = getAllByTestId('select-topic-option')
        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeFalsy();
        expect(options[2].selected).toBeTruthy();
        expect(options[3].selected).toBeFalsy();
        expect(options[4].selected).toBeFalsy();
    })

    test('Simulates difficualty selection', () => {
        const { getByTestId, getAllByTestId } = render(<CreateForm />);
        fireEvent.change(getByTestId('select-difficulty'), { target: { value: "Medium" } })
        let options = getAllByTestId('select-difficulty-option')
        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeTruthy();
        expect(options[2].selected).toBeFalsy();

    })

});