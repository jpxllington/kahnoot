import React, {useState, useEffect} from 'react';
import axios from 'axios';
export const QuizPage = () => {

    const [answers,setAnswers] = useState([])
    const [question,setQuestion] = useState("")
    const [apiData, setApiData]= useState([])
    const [chosenAnswer,setChosenAnswer] = useState("")


    const handleAnswer = (e) => {
        console.log(e);
        setChosenAnswer(e)
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

    const recievesQuestionData = (data) =>{
        let question = data.question
        let answers = data.incorrect_answers.map(a=>({answer:a, correct:false}))
        answers.push({answer:data.correct_answer, correct:true})
        let shuffled = shuffle(answers);
        setAnswers(shuffled);
        setQuestion(question);
    }

    const renderAnswers = () => {
        answers.map((a, i) => <AnswerButton key={i} onClick={(e)=>handleAnswer(e)} value={a.answer}/>)
    }
    return(
        <>
        //     <Header/>
        //     <PlayerList/>
            <Question question={question}/>
            <CountDownTimer/>
            <form>
                { renderAnswers() }
                <input type="hidden" value={chosenAnswer} />

            </form>

        </>
    )
}