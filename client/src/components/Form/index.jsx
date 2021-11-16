import React from 'react';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import './style.css'
import axios from 'axios';
import { fetchQuiz } from '../../actions';

export const CreateForm = () => {


    const [category, setCategory] = useState(9)
    const [user, setUser] = useState('Pingu');
    const [difficulty, setDifficulty] = useState('easy');
    const [amount, setAmount] = useState(10)
    const [categoryList, setCategoryList] = useState([])
    let history = useHistory();
    const dispatch = useDispatch();



    const handleGenQuiz = async (e) => {
        e.preventDefault();
        await dispatch(fetchQuiz(amount, category, difficulty))
        history.push('/quiz')
    }

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const { data } = await axios.get('https://opentdb.com/api_category.php')
                let newCategoryArray = data.trivia_categories.map((data) => ({ id: data.id, category: data.name }))
                console.log(newCategoryArray)

                setCategoryList(newCategoryArray)

                const categoryList = newCategoryArray.map((content) => content.category)

            } catch (err) {
                console.warn(err)
            }
        }
        fetchCategory();

    }, [category])
    console.log(user)





    return (
        <form onSubmit={handleGenQuiz} id='quizParameters'>
            <select value={category} form='quizParameters' name='topic' id='topic' onChange={(e) => setCategory(e.target.value)} >
                {categoryList.map((x, i) => <option key={i} value={x.id}>{x.category}</option>)}
            </select>
            <select value={difficulty} name="difficulty" form="quizParameters" id="difficulty" onChange={(e) => setDifficulty(e.target.value)}>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
            </select>

            {/* <input type='text' id='username' name='username' value={user} onChange={(e) => setUser(e.target.value)}/>
            <button onClick={() => setUser()}>Add User</button> */}
            <input type="number" id="amount" name="amount" min="5" max="25" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type='submit' value="Generate Quiz" />

        </form>
    )
}