import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { socket } from '../../socket'
// import './style.css'
import axios from 'axios';
import { fetchQuiz } from '../../actions';

export const CreateForm = () => {


    const [category, setCategory] = useState(9)
    const [difficulty, setDifficulty] = useState('easy');
    const [amount, setAmount] = useState(10)
    const [categoryList, setCategoryList] = useState([])
    let history = useHistory();
    const dispatch = useDispatch();
    let username = useSelector(state=>state.quiz.username)
    let roomName = useSelector(state=>state.quiz.roomName)

    const handleGenQuiz = async (e) => {
        e.preventDefault();
        await dispatch(fetchQuiz(amount, category, difficulty))
        // apiData = await JSON.stringify(apiData)
        await socket.emit('create', roomName,username, (res) => {
            if(res.message==="game successfully created"){
                history.push('/lobby')
            }
        })
    }

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const { data } = await axios.get('https://opentdb.com/api_category.php')
                let newCategoryArray = data.trivia_categories.map((data) => ({ id: data.id, category: data.name }))

                setCategoryList(newCategoryArray)

            } catch (err) {
                console.warn(err)
            }
        }
        fetchCategory();

    }, [category])





    return (
        <form onSubmit={handleGenQuiz} id='quizParameters' role="generate_quiz">
            <select data-testid="select-topic" value={category} form='quizParameters' name='topic' id='topic' role="select_topic" onChange={(e) => setCategory(e.target.value)} >
                {categoryList.map((x, i) => <option data-testid="select-topic-option" key={i} value={x.id}>{x.category}</option>)}
            </select>
            <select data-testid="select-difficulty" value={difficulty} name="difficulty" form="quizParameters" id="difficulty" role="select_difficulty" onChange={(e) => setDifficulty(e.target.value)}>
                <option data-testid="select-difficulty-option" value='easy'>Easy</option>
                <option data-testid="select-difficulty-option" value='medium'>Medium</option>
                <option data-testid="select-difficulty-option" value='hard'>Hard</option>
            </select>
            <input role="set_nuumber" type="number" id="amount" name="amount" min="5" max="25" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input role="quiz" type='submit' value="Generate Quiz" />

        </form>
    )
}