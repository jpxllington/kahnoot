import React from 'react';
import { useHistory } from "react-router";

export const Header = () => {
    let history = useHistory();

    return (
        <header role="header">
            <button onClick={() => history.push("/")}>Home</button>
            <img role="image" src="" alt="logo" />
            <button onClick={() => history.push('/leaderboard')}>View Leaderboards</button>
        </header>
    )
}