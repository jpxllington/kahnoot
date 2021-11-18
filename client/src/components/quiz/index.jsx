import React, { useState, useEffect } from 'react';
import { GameTimer } from '../../components/';
import { AnswerButton } from "../../components"
import './style.css'

export const Quiz = ({ answers, authenticate, timerDone }) => {
    const [chosenAnswer, setChosenAnswer] = useState("")

    const handleAnswer = async (e) => {
        e.preventDefault()
        console.log(e.target.textContent);
        setChosenAnswer(e.target.textContent);
    }

    useEffect(async () => {
        await authenticate(chosenAnswer);
    }, [chosenAnswer])

    const renderAnswers = () => {
        return answers.map((a, i) => <AnswerButton key={i} handleAnswer={handleAnswer} text={a.answer} />)
    }
    return (
        <div id='quizPage'>
            
            <GameTimer role ="timer" duration={10000000} timerDone={timerDone} />

            <form role ="answers-form" id='answerForm'>
                {renderAnswers()}
                <input type="hidden" value={chosenAnswer} />

            </form>
        </div>
    )
}