import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Quiz } from "../../components";
import { Question } from "../../components";
export const QuizPage = () => {

    const [answers,setAnswers] = useState([])
    const [question,setQuestion] = useState("")
    const [apiData, setApiData]= useState([])
    const [chosenAnswer,setChosenAnswer] = useState("")
    const [correctAnswer,setCorrectAnswer] = useState("")
    const [timer,setTimer] = useState();

    const handleAnswer = async(e) => {
        e.preventDefault()
        console.log(e.target.textContent);
        setChosenAnswer(e.target.textContent);
    }

    useEffect(() =>{
        async function callAPI() {
            let amount = 10;
            let category = 23;
            let difficulty = "easy";
            let {data} = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`)
            setApiData(data.results);
            recievesQuestionData(data.results[0])
            
        }
        callAPI()
    },[])

        const authenticate = (chosenAnswer) => {
            console.log(correctAnswer);
            console.log(chosenAnswer);
            if(correctAnswer===chosenAnswer){
                console.log("answer authenticated");
            } else{
                console.log("wrong");
            }
        }
    
        


 
  


    // setTimer()

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
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

    const timerDone = () => {
        console.log("next question");
    }

    const recievesQuestionData = (data) =>{
        let question = data.question
        let answers = data.incorrect_answers.map(a=>({answer:a, correct:false}))
        answers.push({answer:data.correct_answer, correct:true})
        let shuffled = shuffle(answers);
        setAnswers(shuffled);
        setQuestion(question);
        setCorrectAnswer(data.correct_answer)
    }

    return(
        <>
            <Question question={question}/>
            <Quiz answers={answers} authenticate={authenticate} timerDone={timerDone}/>
        </>
    )
}