import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import he from 'he'

export const Results = () => {
    const apiData = useSelector(state => state.apiData);
    const finalAnswers = useSelector(state => state.finalAnswers);
    const currentQ = useSelector(state => state.currentQ);
    const score = useSelector(state => state.score);

    const correctAnswers = apiData.map(a => he.decode(a.correct_answer));

    const renderAnswers = () => {
        let list = []
        for (let i = 0; i < finalAnswers.length; i++) {
            list.push(<li key={i}>Your answer: {finalAnswers[i]} - Correct answer: {correctAnswers[i]}</li>)
        }
        return list
    }

    return (
        <div>
            <p>You scored {score}/{currentQ + 1}</p>
            <Link to='/'><button>Home</button></Link>
            {renderAnswers()}
        </div>
    )
}
