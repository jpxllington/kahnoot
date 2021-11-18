import React from 'react';
import './style.css'
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Logo from '../../../assets/pinguLogo.jpeg'


export const Header = () => {
    let history = useHistory();

    return (
        <header role="header">
            <img src={Logo} alt="logo" id='logo' />
            <button className='headerButtons' onClick={() => history.push("/")}>Home</button>
            <button className='headerButtons' onClick={() => history.push('/leaderboard')}>View Leaderboards</button>
        </header>
    )
}