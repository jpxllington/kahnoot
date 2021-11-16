import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import NumericInput from 'react-numeric-input'
// import './style.css'
import axios from 'axios';

export const CreateForm = () => {

    const [category, setCategory] = useState('General Knowledge')
    const [users, setUsers] = useState([]);
    const [difficulty, setDifficulty] = useState('easy');
    const [amount, setAmount] = useState(10)

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const { data } = await axios.get('https://opentdb.com/api_category.php')
                let newCategoryArray = data.trivia_categories.map((data) => ({ id: data.id, category: data.name }))
                console.log(newCategoryArray)

                const categoryList = newCategoryArray.map((content) => content.category)


            } catch (err) {
                console.warn(err)
            }
        }
        fetchCategory();
    }, [])


    return (
        <form onSubmit={handleSubmit} id='quizParameters'>
            <select value={category} form='quizParameters' name='topic' id='topic' onChange={(e) => setCategory(e.target.value)} >
                <option value='General Knowledge'>General Knowledge</option>
                <option value='Science: Mathematics'>Science: Mathematics</option>
                <option value='Sports'>Sports</option>
            </select>
            <select value={difficulty} name="difficulty" form="quizParameters" id="difficulty" onChange={(e) => setDifficulty(e.target.value)}>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
            </select>
            <input type="number" id="amount" name="amount" min="3" max="25" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type='submit' />
        </form>
    )
}