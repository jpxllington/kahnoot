import React from 'react';
import { socket } from '../../socket';

export const PlayerCard = ({username}) => {

    socket.on('player', )


    return (
        <div role="username" className="card">
            {username}
        </div>
    )
}