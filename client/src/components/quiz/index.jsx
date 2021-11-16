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

    useEffect(() => {
        authenticate(chosenAnswer);
    }, [chosenAnswer])

    const renderAnswers = () => {
        return answers.map((a, i) => <AnswerButton key={i} handleAnswer={handleAnswer} text={a.answer} />)
    }
    return (
        <>
            <GameTimer duration={10000} timerDone={timerDone} />
            <form>
                {renderAnswers()}
                <input type="hidden" value={chosenAnswer} />

            </form>

        </>
    )
}