import React from 'react';
import './style.css'

import { Link } from "react-router-dom";

export const Header = () => {

    return (
        <header>
            <Link to={"./"}>Home</Link>
            <img src="" alt="logo" />
            <Link to={"./leaderboard"}>View Leaderboards</Link>
        </header>
    )
}