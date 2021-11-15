import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import axios from 'axios';
import './style.css';


export const Leaderboard = () => {

    const [ category, setCategory ] = useState('');
    const [ scores , setScores ] = useState();
    const [ difficulty, setDifficulty ] = useState('');

    const deficultis=['Easy','Medium','Hard'];
    const categories=['Sports','History','General Knowledge','Entertainment','Celeberties'];

    const data={"scores": [{"id":"1","username":"Bob","category":"General Knowledge","difficulty":"Easy","score":9},
    {"id":"2","username":"Kelly","category":"General Knowledge","difficulty":"Easy","score":6},
    {"id":"3","username":"Emma","category":"General Knowledge","difficulty":"Easy","score":7},
    {"id":"4","username":"Alex","category":"History","difficulty":"Easy","score":4},
    {"id":"5","username":"Tom","category":"Sports","difficulty":"Easy","score":10}]}

    const history = useHistory();

    const sortScores = (x, y) => {
        return x.score - y.score;  //return a sorted data in descending order of score
    }


    useEffect(() => {
        async function getScores(){
            try{
                const playersData=data.scores;
                console.log(playersData);
                console.log(category);
                console.log(difficulty);
                const filteredScores = await playersData.filter(d => d.category == category && d.difficulty == difficulty);
                filteredScores.sort(sortScores);
                setScores(filteredScores);
            } catch(error) {
                console.log(error.message);
            }
        } 
        getScores();
    }, [category, difficulty])



    return (
        <>
            <div>
                <h2>High Scores!</h2>
            </div>
            
            <form id="scores">
                <div className="custom-select">
                    <label htmlFor="testTopic">Test topic</label>
                    <label htmlFor="difficulty">Difficaulty</label>
                    <br></br>
                    <select name="testTopic" id="testTopic" onChange={(e) => setCategory(e.target.value)}>
                        <option>Topic</option>
                        {categories.map((d,i) => <option key={i}>{d}</option>)}
                    </select>
                    
                    <select name="difficulty" id="difficulty" onChange={(e)=> setDifficulty(e.target.value)}>
                        <option>Difficulty</option>
                        {deficultis.map( (x) => <option>{x}</option>)})
                    </select>
                </div>
            </form>

            <table id="rankings" className="table">
			<thead>
				<tr>
					<th>Rank</th>
					<th>Username</th>
					<th>Score</th>
				</tr>
			</thead>
			<tbody>
                {console.log(scores)}
                {scores && 
                    scores.map((x, i ) => <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{x.username}</td>
                                            <td>{x.score}</td>
                                        </tr>)
                                        }
			</tbody>
		</table>

        </>
    )

   
}


