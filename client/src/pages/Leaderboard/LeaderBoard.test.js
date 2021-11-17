import {  Leaderboard } from '.';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { shallow } from 'enzyme';
import axios from 'axios';
jest.mock('axios');

describe('Leaderboard', () => {

    // beforeEach(()=>{
    //     let subSelectFn = jest.fn();
    //     let wrapper = shallow(<Leaderboard onSubSelect={subSelectFn}/>);

    // })

    const palyersData = [
        {"id":"1","username":"Bob","category":"General Knowledge","difficulty":"Easy","score":9},
    {"id":"2","username":"Kelly","category":"General Knowledge","difficulty":"Easy","score":6},
    {"id":"3","username":"Emma","category":"General Knowledge","difficulty":"Easy","score":7},
    {"id":"4","username":"Alex","category":"History","difficulty":"Easy","score":4},
    {"id":"5","username":"Tom","category":"Sports","difficulty":"Easy","score":10}
    ]

    test('It renders the title', () => {
        render(<Leaderboard />)
        const heading = screen.getByText('Leaderboard')
        expect(heading.textContent).toContain('Leaderboard');
    });

    test('Values are set properly when render the page',  () => {
        render(<Leaderboard />)
        const tableInfo=screen.getByRole('display-scores');
        const category = screen.getByRole('selectCategory');
        const difficulty = screen.getByRole("selectDifficulty");
        
        expect(difficulty.value).toBe("Difficulty");
        expect(category.value).toBe("Topic");
        expect(tableInfo.textContent).toContain('Username');
    });

    test('Changing category and deficaulty',  () => {


        render(<Leaderboard />)
        const tableInfo=screen.getByRole('display-scores');
        const category = screen.getByRole('selectCategory');
        const difficulty = screen.getByRole("selectDifficulty");
        
        expect(difficulty.value).toBe("Difficulty");
        expect(category.value).toBe("Topic");
        expect(tableInfo.textContent).toContain('Username');

        // const topic = screen.getByText("General Knowledge");
        userEvent.click(category);
        expect(category.value).toBe("General Knowledge");

    });


    test('it makes a request to the api on load and renders players data', async () => {

        axios.get.mockResolvedValue({ data: palyersData });
        render(<Leaderboard />);
        const category = screen.getByRole('selectCategory');
        const difficulty = screen.getByRole("selectDifficulty");
        category.value="General Knowledge";
        difficulty.value="Easy";
        // expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/articles/));
        console.log( difficulty.value);
        const playerInfo =  await screen.findByRole('display-scores')
        console.log(playerInfo);
        expect(playerInfo[1].textcontent).toBe('Silver')
    

    });

 

});