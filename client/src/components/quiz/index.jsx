import React, { useState, useEffect } from 'react';
import { GameTimer } from '../../components/';
import { AnswerButton } from "../../components"


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
        <>
            <GameTimer role ="timer" duration={8000} timerDone={timerDone} />
            <form role ="answers-form">
                {renderAnswers()}
                <input type="hidden" value={chosenAnswer} />

            </form>
        </>
    )
}