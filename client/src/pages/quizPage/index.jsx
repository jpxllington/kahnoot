import React, { useState, useEffect } from 'react';
import { Quiz } from "../../components";
import { Question } from "../../components";
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { changeQ, endQuiz, setCorrect, setCurrent } from '../../actions';
import he from 'he';

export const QuizPage = () => {

    const [answers, setAnswers] = useState([])
    const [question, setQuestion] = useState("")

    let currentQ = useSelector(state => state.quiz.currentQ);
    const apiData = useSelector(state => state.quiz.apiData);

    const history = useHistory();
    const dispatch = useDispatch();

    const authenticate = (chosenAnswer) => {
        dispatch(setCurrent(chosenAnswer));
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
        if (qIndex === apiData.length) {
            dispatch(endQuiz());
            history.push('/results');
        } else {
            console.log("next question");
            dispatch(changeQ())
        }
    }

    useEffect(() => {
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
    }, [currentQ])

    return (
        <>
            {/* <PlayerList/> */}
            <Question question={question} />
            <Quiz answers={answers} authenticate={authenticate} timerDone={timerDone} />
        </>
    )
}