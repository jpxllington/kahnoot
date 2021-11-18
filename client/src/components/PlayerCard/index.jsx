import React from 'react';
import "./style.css"
import { useSelector } from 'react-redux'

export const PlayerCard = ({username}) => {
    const host = useSelector((state) => state.user.host)

    console.log(username);

    return (
        <div role="username" className={host === username ? 'host card' : 'card' }>
            <p className='playerName'>{username}</p>
        </div>
    )
}