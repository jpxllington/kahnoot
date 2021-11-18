import React, { useEffect, useState } from 'react';
import { db_URL } from '../../actions';
import axios from 'axios';
import './style.css';

export const Leaderboard = () => {

    const [topic, setTopic] = useState('');
    const [scores, setScores] = useState([]);
    const [difficulty, setDifficulty] = useState('');
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([])

    const difficulties = ['easy', 'medium', 'hard'];

    // Get the categories list
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const { data } = await axios.get('https://opentdb.com/api_category.php')
                let newCategoryArray = data.trivia_categories.map((data) => (data.name))

                setCategories(newCategoryArray)

            } catch (err) {
                console.warn(err)
            }
        }
        fetchCategory();
    }, [])

    // use this to fetch the data from storage
    useEffect(async () => {
        try {
            const fetchData = await axios.get(`${db_URL}/leaderboard`); //fetch the players data
            setData(fetchData.data);
        } catch (error) {
            console.warn(error.message);
        }
    }, []);


    useEffect(() => {
        async function getScores() {
            try {
                // console.log(data);
                const filteredScores = await data.filter(d => d.topic == topic && d.difficulty == difficulty);
                filteredScores.sort(sortScores); //((x,y) => x.score - y.score);
                setScores(filteredScores);
            } catch (error) {
                console.warn(error.message);
            }
        }
        getScores();
    }, [topic, difficulty])


    const sortScores = (x, y) => {
        return y.score - x.score; //return a sorted data in descending order of score
    }

    return (
        <>
            <div>
                <h2>Leaderboard</h2>
            </div>

            <form id="scores" role="form">
                <div className="custom-select">
                    <label htmlFor="testTopic">Category</label>
                    <label htmlFor="difficulty">Difficulty</label>
                    <br></br>
                    <select data-testid="select-topic" name="testTopic" id="testTopic" role="selectCategory" value={topic} onChange={(e) => setTopic(e.target.value)}>
                        <option key={0} >Topic</option>
                        {categories.map((d, i) => <option data-testid="select-topic-option" key={i} > {d} </option>)}
                    </select>

                    <select data-testid="select-difficulty" name="difficulty" id="difficulty" role="selectDifficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option key={0}>Difficulty</option>
                        {difficulties.map((x, i) => <option data-testid="select-difficulty-option" key={i}> {x} </option>)})
                    </select>
                </div>
            </form>

            <table id="rankings" className="table" role="display-scores">
                <thead>
                    <tr>
                        <th className="tableInfo">Rank</th>
                        <th className="tableInfo">Username</th>
                        <th className="tableInfo">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {scores && scores.map((x, i) => <tr key={i}>
                        <td className="tableInfo">{i + 1}</td>
                        <td className="tableInfo">{x.name}</td>
                        <td className="tableInfo">{x.score}</td>
                    </tr>)
                    }
                </tbody>
            </table>

        </>
    )

}


