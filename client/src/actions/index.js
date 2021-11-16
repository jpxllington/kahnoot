import axios from "axios";

export const fetchQuiz = (amount, category, difficulty) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`);

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