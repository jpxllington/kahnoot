import React, { useState, useEffect } from 'react';
import { Quiz } from "../../components";
import { Question } from "../../components";
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { changeQ } from '../../actions';
import he from 'he';

export const QuizPage = () => {

    const [answers, setAnswers] = useState([])
    const [question, setQuestion] = useState("")
    const [correctAnswer, setCorrectAnswer] = useState("")

    let currentQ = useSelector(state => state.currentQ);
    const apiData = useSelector(state => state.apiData);
    console.log(apiData);

    let correct = false
    const history = useHistory();
    const dispatch = useDispatch();

    const authenticate = (chosenAnswer) => {
        correct = !!chosenAnswer && chosenAnswer === correctAnswer;
        console.log(correct);
        console.log(correctAnswer);
        console.log(chosenAnswer);
    }

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
        console.log(apiData[qIndex]);
        console.log("next question");
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
            {/* <Header/> */}
            {/* <PlayerList/> */}
            <Question question={question} />
            <Quiz answers={answers} authenticate={authenticate} timerDone={timerDone} />
        </>
    )
}