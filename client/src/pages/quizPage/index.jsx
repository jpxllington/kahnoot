import React, { useState, useEffect } from 'react';
import { PlayerCard } from "../../components/PlayerCard"
import { Quiz } from "../../components";
import { Question } from "../../components";
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { changeQ, endQuiz, setCorrect, setCurrent } from '../../actions';
import he from 'he';
import {socket} from "../../socket"
import './style.css'

export const QuizPage = () => {

    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState("");
    const players = useSelector(state => state.user.players);
    let currentQ = useSelector(state => state.quiz.currentQ);
    const apiData = useSelector(state => state.quiz.apiData);
    const roomName = useSelector(state => state.quiz.roomName)
    const history = useHistory();
    const dispatch = useDispatch();

    console.log("you reached quiz");

    const authenticate = (chosenAnswer) => {
        dispatch(setCurrent(chosenAnswer));
    }


    useEffect(()=>{
        if(!roomName){
            history.push("/")
        } else {
            socket.on("updatedPlayers", (players) => {
                dispatch(addPlayers(players));
            })
        }
    },[])

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }


    const timerDone = (qIndex) => {
        if (qIndex === apiData.length) {
            dispatch(endQuiz());
            history.push('/results');
        } else {
            console.log("next question");
            dispatch(changeQ())
        }
    }

    useEffect(() => {
        if (roomName){
            const recievesQuestionData = (data) => {
                let question = he.decode(data.question)
                let answers = data.incorrect_answers.map(a => ({ answer: he.decode(a), correct: false }))
                answers.push({ answer: he.decode(data.correct_answer), correct: true })
                let shuffled = shuffle(answers);
                setAnswers(shuffled);
                setQuestion(question);
                dispatch(setCorrect(he.decode(data.correct_answer)))
                dispatch(setCurrent(""))
            }
            recievesQuestionData(apiData[currentQ])

        }
    }, [currentQ])

   

    return (
        <div className="pageSection" id="actualQuizPage">
            <div id='usernameContainer'>
                {!!players && players.map((player) => <PlayerCard key={players.indexOf(player)} username={player.username} />)}
            </div>
            <div>
                <Question question={question} />
                <Quiz answers={answers} authenticate={authenticate} timerDone={timerDone} />
            </div>
        </div>
    )
}

