import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './style.css';


const Leaderboard = () => {

    const [ category, setCategory ] = useState('');

    const categories=['Sports','History','General knowledge','Entertainment','Celeberties'];

    const data={"scores": [{"id":"1","username":"Bob","category":"General Knowledge","difficulty":"easy","score":9},
    {"id":"2","username":"Kelly","category":"General Knowledge","difficulty":"easy","score":6},
    {"id":"3","username":"Emma","category":"General Knowledge","difficulty":"easy","score":7},
    {"id":"4","username":"Alex","category":"History","difficulty":"easy","score":4},
    {"id":"5","username":"Tom","category":"Sports","difficulty":"easy","score":10}]}

    const history = useHistory();

   
}

