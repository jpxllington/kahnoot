import React from 'react';
import { useHistory } from "react-router";
import { socket } from "../../socket";

export const Header = () => {
    let history = useHistory();

    return (
        <header role="header">
            <button onClick={() => {socket.disconnect(true), history.push("/")}}>Home</button>
            <img role="image" src="" alt="logo" />
            <button onClick={() => {socket.disconnect(true), history.push('/leaderboard')}}>View Leaderboards</button>
        </header>
    )
}