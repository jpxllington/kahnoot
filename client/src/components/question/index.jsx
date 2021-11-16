import React from 'react';

export const Question = ({ question }) => {
    //"The &quot;Trail of Tears&quot; President&#039;s Indian"

    return (
        <p>{decodeURIComponent(question)}</p>
    )
}