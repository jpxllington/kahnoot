import React from 'react';
import "./style.css"

export const PlayerCard = ({username}) => {


    console.log(username);

    return (
        <div role="username" className="card">
            {username}
        </div>
    )
}