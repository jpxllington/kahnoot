import React from 'react';
import { useHistory } from "react-router";

export const Header = () => {
    let history = useHistory();

    return (
        <header role="header">
            <button onClick={() => history.push("/")}>Home</button>
            <img src="" alt="logo" />
            <button onClick={() => history.push('/leaderboard')}>View Leaderboards</button>
        </header>
    )
}