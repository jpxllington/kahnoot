import React, { useState, useEffect } from "react";
import { useHistory } from "react-router"
import { PlayerCard } from "../../components/PlayerCard"
import { useSelector } from "react-redux";
import { socket} from "../../socket"

export const Lobby = () => {
    const room = useSelector(state => state.roomName)
    const [players, setPlayers] = useState([])

    let history =useHistory();
    const handleClick = () => {
        history.push("/quiz")
    }
    
    let currentPlayers = useSelector(state => state.players);
    
    socket.emit('players', roomName, (res))

    
    
    return (
        <>
            {players.map((player) => <PlayerBubble key={players.indexOf(player)} player={player} />)}
            <button onClick={handleClick}>Go to quiz</button>
        </>
    )
}