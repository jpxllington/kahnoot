import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './style.css';

export const Leaderboard = () => {

    const [ topic, setTopic ] = useState('');
    const [ scores , setScores ] = useState([]);
    const [ difficulty, setDifficulty ] = useState('');
    const [ data, setData ] = useState([]);

    const deficultis=['Easy','Medium','Hard'];
    const categories=['Sports','History','General Knowledge','Entertainment','Celeberties','Art'];

    // const data=[{"id":"1","username":"Bob","category":"General Knowledge","difficulty":"Easy","score":9},
    // {"id":"2","username":"Kelly","category":"General Knowledge","difficulty":"Easy","score":6},
    // {"id":"3","username":"Emma","category":"General Knowledge","difficulty":"Easy","score":7},
    // {"id":"4","username":"Alex","category":"History","difficulty":"Easy","score":4},
    // {"id":"5","username":"Tom","category":"Sports","difficulty":"Easy","score":10}]

    const history = useHistory();

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
                    <select name="testTopic" id="testTopic" role="selectCategory"  onChange={(e) => setTopic(e.target.value)}>
                        <option key={0} >Topic</option>
                        {categories.map((d,i) => <option key={i}> { d } </option>)}
                    </select>
                    
                    <select name="difficulty" id="difficulty" role="selectDifficulty" onChange={(e)=> setDifficulty(e.target.value)}>
                        <option key={0}>Difficulty</option>
                        {deficultis.map( (x,i) => <option key={i}> { x } </option>)})
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
                {scores && 
                    scores.map((x, i ) => <tr key={i}>
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


