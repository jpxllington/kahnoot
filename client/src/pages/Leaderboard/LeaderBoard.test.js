import { Leaderboard } from '.';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
jest.mock('axios');
const playersData = {
    data: [
        { "id": "1", "username": "Bob", "category": "General Knowledge", "difficulty": "Easy", "score": 9 },
        { "id": "2", "username": "Kelly", "category": "General Knowledge", "difficulty": "Easy", "score": 6 },
        { "id": "3", "username": "Emma", "category": "General Knowledge", "difficulty": "Easy", "score": 7 },
        { "id": "4", "username": "Alex", "category": "History", "difficulty": "Easy", "score": 4 },
        { "id": "5", "username": "Tom", "category": "Sports", "difficulty": "Easy", "score": 10 }
    ]
}

describe('Leaderboard', () => {

    // beforeEach(()=>{
    //     let subSelectFn = jest.fn();
    //     let wrapper = shallow(<Leaderboard onSubSelect={subSelectFn}/>);

    // })

    beforeEach(() => {
        render(<Leaderboard />, { wrapper: MemoryRouter })
        jest.resetAllMocks();

    })


    test('It renders the title', async () => {
        axios.get.mockResolvedValue({ ...playersData })
        const heading = screen.getByText('Leaderboard')
        await waitFor(() => {
            expect(heading.textContent).toContain('Leaderboard');
        })
    });

    test('Values are set properly when render the page', async () => {
        axios.get.mockResolvedValue({ ...playersData })
        const tableInfo = screen.getByRole('display-scores');
        const category = screen.getByRole('selectCategory');
        const difficulty = screen.getByRole("selectDifficulty");

        await waitFor(() => {
            expect(difficulty.value).toBe("Difficulty");
            expect(category.value).toBe("Topic");
            expect(tableInfo.textContent).toContain('Username');
        });
    });

    // test('Changing category and deficaulty',  () => {
    //     render(<Leaderboard />)
    //     const tableInfo=screen.getByRole('display-scores');
    //     const category = screen.getByRole('selectCategory');
    //     const difficulty = screen.getByRole("selectDifficulty");
    //     expect(difficulty.value).toBe("Difficulty");
    //     expect(category.value).toBe("Topic");
    //     expect(tableInfo.textContent).toContain('Username');
    //     const generalKnowledge = screen.getByText("General Knowledge");
    //     userEvent.click(generalKnowledge);
    //     expect(category.value).toBe("General Knowledge");
    // });



    // test('it makes a request to the api on load and renders players data', async () => {

    //     axios.get.mockResolvedValue({ data: palyersData });

    //     const category = screen.getByRole('selectCategory');
    //     const difficulty = screen.getByRole("selectDifficulty");
    //     category.value = "General Knowledge";
    //     difficulty.value = "Easy";
    //     // expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/articles/));
    //     console.log(difficulty.value);
    //     const playerInfo = await screen.findByRole('display-scores')
    //     console.log(playerInfo);
    //     expect(playerInfo[1].textcontent).toBe('Silver')


    // });
});

describe('Leaderboard part 2', () => {
    test('Simulates topic selection', async () => {
        const { getByTestId, getAllByTestId } = render(<Leaderboard />);
        axios.get.mockResolvedValue({ ...playersData })
        fireEvent.change(getByTestId('select-topic'), { target: { value: "General Knowledge" } })
        let options = getAllByTestId('select-topic-option')
        await waitFor(() => {
            expect(options[0].selected).toBeFalsy();
            expect(options[1].selected).toBeFalsy();
            expect(options[2].selected).toBeTruthy();
            expect(options[3].selected).toBeFalsy();
            expect(options[4].selected).toBeFalsy();
        })
    })

    test('Simulates difficualty selection', async () => {
        const { getByTestId, getAllByTestId } = render(<Leaderboard />);
        axios.get.mockResolvedValue({ ...playersData })
        fireEvent.change(getByTestId('select-difficulty'), { target: { value: "Medium" } })
        let options = getAllByTestId('select-difficulty-option')
        await waitFor(() => {
            expect(options[0].selected).toBeFalsy();
            expect(options[1].selected).toBeTruthy();
            expect(options[2].selected).toBeFalsy();
        })

    })
})