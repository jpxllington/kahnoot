import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import './style.css';

export const Leaderboard = () => {

    const [ topic, setTopic ] = useState('');
    const [ scores , setScores ] = useState([]);
    const [ difficulty, setDifficulty ] = useState('');
    const [ data, setData ] = useState([]);

    const deficultis=['Easy','Medium','Hard'];
    const categories=['Sports','History','General Knowledge','Entertainment','Celeberties','Art','Politics','Geography'];

    // use this to fetch the data from storage
    useEffect(async () => {
        try {
            const fetchData   = await axios.get('http://localhost:3000/leaderboard'); //fetch the players data
            console.log(fetchData.data);
            setData(fetchData.data);
        } catch (error) {
            console.log(error.message);
        }
    }, []);


    useEffect(() => {
        async function getScores(){
            try{
                // console.log(data);
                const filteredScores = await data.filter(d => d.topic == topic && d.difficulty == difficulty);
                filteredScores.sort(sortScores); //((x,y) => x.score - y.score);
                setScores(filteredScores);
            } catch(error) {
                
                console.log(error.message);
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
                    <label htmlFor="testTopic">Test topic</label>
                    <label htmlFor="difficulty">Difficaulty</label>
                    <br></br>
                    <select data-testid="select-topic" name="testTopic" id="testTopic" role="selectCategory"  onChange={(e) => setTopic(e.target.value)}>
                        <option key={0} >Topic</option>
                        {categories.map((d,i) => <option data-testid="select-topic-option" key={i} > { d } </option>)}
                    </select>
                    
                    <select data-testid="select-difficulty" name="difficulty" id="difficulty" role="selectDifficulty"  onChange={(e)=> setDifficulty(e.target.value)}>
                        <option key={0}>Difficulty</option>
                        {deficultis.map( (x,i) => <option data-testid="select-difficulty-option" key={i}> { x } </option>)})
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
                    {console.log(scores)}
                    {scores &&  scores.map((x, i ) => <tr key={i}>
                                                <td className="tableInfo">{i+1}</td>
                                                <td className="tableInfo">{x.name}</td>
                                                <td className="tableInfo">{x.score}</td>
                                            </tr>)
                                        }
                </tbody>
		    </table>

        </>
    )
   
}


