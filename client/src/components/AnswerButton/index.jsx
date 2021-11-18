import React from 'react';

export const AnswerButton = ({ text, handleAnswer }) => {

    return (
        <>
            <button role="answerButton" onClick={(e) => handleAnswer(e)}>
                {text}
            </button>
        </>
    )
}