import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import { Link } from "react-router-dom";

export const Header = () => {

    return (
        <header role="header">
            <Router>
                <Link to={"./"}>Home</Link>
                <img src="" alt="logo" />
                <Link to={"./leaderboard"}>View Leaderboards</Link>
            </Router>
        </header>
    )
}