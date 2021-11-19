import React from 'react';
import './style.css'

export const Question = ({ question }) => {
    return (
        <p className='question' role="question">{question}</p>
    )
}