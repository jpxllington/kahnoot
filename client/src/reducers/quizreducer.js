const init = {
    apiData: [],
    correctAnswer: "",
    currentAnswer: "",
    currentQ: 0,
    score: 0
}

export const quizReducer = (state = init, action) => {
    switch (action.type) {
        case "STORE_QUESTIONS":
            return {
                ...state,
                apiData: action.payload,
                currentQ: 0,
                score: 0
            };
        case "SET_CORRECT_ANSWER":
            return {
                ...state,
                correctAnswer: action.payload
            };
        case "SET_CURRENT_ANSWER":
            return {
                ...state,
                currentAnswer: action.payload
            };
        case "CHANGE_QUESTION":
            return {
                ...state,
                currentQ: state.currentQ + 1,
                score: (!!state.currentAnswer && state.currentAnswer === state.correctAnswer) ? state.score + 1 : state.score
            };
        case "END_QUIZ":
            return {
                ...state,
                score: (!!state.currentAnswer && state.currentAnswer === state.correctAnswer) ? state.score + 1 : state.score
            };
        default:
            return state;
    }
}