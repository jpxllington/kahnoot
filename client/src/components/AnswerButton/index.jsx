import React from 'react';

export const AnswerButton = ({text, handleAnswer}) => {
    
    
    return(
        <>
            <button onClick={(e)=>handleAnswer(e)}>
                {text}
            </button>
        </>
    )
}