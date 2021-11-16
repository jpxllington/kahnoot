import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Quiz } from "../../components";
import { Question } from "../../components";
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuiz, changeQ } from '../../actions';
import he from 'he';

export const QuizPage = () => {

    const [answers, setAnswers] = useState([])
    const [question, setQuestion] = useState("")
    // const [apiData, setApiData] = useState([])
    // const [currentQ, setCurrentQ] = useState()
    // const [chosenAnswer, setChosenAnswer] = useState("")
    const [correctAnswer, setCorrectAnswer] = useState("")
    // const [timer, setTimer] = useState();
    let currentQ = useSelector(state => state.currentQ);
    const apiData = useSelector(state => state.apiData);
    console.log(apiData);

    let correct = false
    const history = useHistory();
    const dispatch = useDispatch();

    // const handleAnswer = async (e) => {
    //     e.preventDefault()
    //     console.log(e.target.textContent);
    //     setChosenAnswer(e.target.textContent);
    // }

    // useEffect(() => {
    //     let amount = 10;
    //     let category = 23;
    //     let difficulty = "easy";
    //     dispatch(fetchQuiz(amount, category, difficulty))
    //     // async function callAPI() {
    //     //     let amount = 10;
    //     //     let category = 23;
    //     //     let difficulty = "easy";
    //     //     let { data } = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`)
    //     //     setApiData(data.results);
    //     //     setCurrentQ(0);
    //     //     // recievesQuestionData(data.results[0])

    //     // }
    //     // callAPI()
    // }, [])
    const authenticate = (chosenAnswer) => {
        correct = !!chosenAnswer && chosenAnswer === correctAnswer;
        console.log(correct);
        console.log(correctAnswer);
        console.log(chosenAnswer);
        // const qIndex = apiData.findIndex(x => x.question === question);
        // const qIndex = apiData.map(d => d.question).indexOf(question);
        // correctAnswers = correctAnswer === chosenAnswer
        // console.log(correctAnswers);
        // if (correctAnswer === chosenAnswer) {
        //     console.log("answer authenticated");
        // } else {
        //     console.log("wrong");
        // }
    }


    // setTimer()

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
        qIndex === apiData.length ? history.push('/results')
            : dispatch(changeQ())
        // : recievesQuestionData(apiData[qIndex])
        console.log(apiData[qIndex]);
        console.log("next question");
        // const authenticate = (chosenAnswer) => {
        //     console.log(correctAnswer);
        //     console.log(chosenAnswer);
        //     if(correctAnswer===chosenAnswer){
        //         console.log("answer authenticated");
        //     } else{
        //         console.log("wrong");
        //     }
        // }
        // authenticate(chosenAnswer)
    }

    useEffect(() => {
        const recievesQuestionData = (data) => {
            let question = he.decode(data.question)
            let answers = data.incorrect_answers.map(a => ({ answer: he.decode(a), correct: false }))
            answers.push({ answer: he.decode(data.correct_answer), correct: true })
            let shuffled = shuffle(answers);
            setAnswers(shuffled);
            setQuestion(question);
            setCorrectAnswer(data.correct_answer)
        }
        console.log(apiData);
        recievesQuestionData(apiData[currentQ])
    }, [currentQ])

    return (
        <>
            <Question question={question} />
            <Quiz answers={answers} authenticate={authenticate} timerDone={timerDone} />
        </>
    )
}