const init = {
    apiData: [],
    correctAnswer: "",
    currentAnswer: "",
    finalAnswers: [],
    currentQ: 0,
    score: 0,
    roomName:"",
    username: "",
}

export const quizReducer = (state = init, action) => {
    switch (action.type) {
        case "STORE_QUESTIONS":
            return {
                ...state,
                apiData: action.payload,
                finalAnswers: [],
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
                finalAnswers: [...state.finalAnswers, state.currentAnswer],
                score: (!!state.currentAnswer && state.currentAnswer === state.correctAnswer) ? state.score + 1 : state.score
            };
        case "END_QUIZ":
            return {
                ...state,
                finalAnswers: [...state.finalAnswers, state.currentAnswer],
                score: (!!state.currentAnswer && state.currentAnswer === state.correctAnswer) ? state.score + 1 : state.score
            };
        case "SET_ROOM":
            return {
                ...state,
                roomName:action.payload.roomName,
                username:action.payload.username
            };
        default:
            return state;
    }
}