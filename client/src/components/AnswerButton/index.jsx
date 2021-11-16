import React from 'react';

export const AnswerButton = ({text, handleAnswer}) => {
    
    const handleSubmit = (e) => {
        handleAnswer(e);
    }
    return(
        <>
            <button onClick={(e)=>handleAnswer(e)}>
                {text}
            </button>
        </>
    )
}