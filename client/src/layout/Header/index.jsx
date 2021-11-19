import React from 'react';
import './style.css'
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Logo from '../../../assets/pinguLogo.jpeg'
import Title from '../../../assets/kahnootLogoColored_transparent.png';
import { socket } from "../../socket";


export const Header = () => {
    let history = useHistory();

    return (
        <header role="header">

            <div className="headerLogoButtons">
            <img role="image" src={Logo} alt="logo" id="logo" />
                <button className='headerButtons' onClick={() => {socket.disconnect(true), history.push("/")}}>Home</button>
            <button className='headerButtons' onClick={() => {socket.disconnect(true), history.push('/leaderboard')}}>View Leaderboards</button>
            </div>

            <div id="kahnoot">
                <img id="title" src={Title} />
            </div>

            

        </header>
    )
}