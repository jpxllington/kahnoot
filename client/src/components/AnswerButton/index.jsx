import React from 'react';
import './style.css'

export const AnswerButton = ({ text, handleAnswer }) => {

    return (
        <>
            <button role="answerButton" onClick={(e) => handleAnswer(e)} className='answer'>
                {text}
            </button>
        </>
    )
}