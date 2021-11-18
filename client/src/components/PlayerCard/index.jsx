import React from 'react';
import { socket } from '../../socket';

export const PlayerCard = ({username}) => {

    socket.on('player', )


    return (
        <div className="card">
            {username}
        </div>
    )
}