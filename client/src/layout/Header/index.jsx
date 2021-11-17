import React from 'react';

import { Link } from "react-router-dom";

export const Header = () => {

    return(
        <>
            <Link to={"./"}>Home</Link>
            <img src="" alt="logo" />
            <Link to={"./leaderboard"}>View Leaderboards</Link>
        </>
    )
}