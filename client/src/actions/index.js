import axios from "axios";

export const fetchQuiz = (amount, category, difficulty) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);

            dispatch({
                type: "STORE_QUESTIONS",
                payload: data.results,
            });
        } catch (err) {
            console.warn(err.message)
            dispatch({
                type: "SET_ERROR",
                payload: err.message
            })
        }
    };
};

export const changeQ = () => ({ type: "CHANGE_QUESTION" })
export const endQuiz = () => ({ type: "END_QUIZ" })

export const setCorrect = (answer) => ({ type: "SET_CORRECT_ANSWER", payload: answer })
export const setCurrent = (answer) => ({ type: "SET_CURRENT_ANSWER", payload: answer })
export const setRoom = (username,roomName) => ({ type: "SET_ROOM", payload:{username,roomName}})



export const db_URL = "http://localhost/";
export const socket_URL = "http://localhost/1234"