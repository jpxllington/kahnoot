const init = {
    apiData: [],
    currentQ: 0
}

export const quizReducer = (state = init, action) => {
    switch (action.type) {
        case "STORE_QUESTIONS":
            return {
                ...state,
                apiData: action.payload
            };
        case "CHANGE_QUESTION":
            return {
                ...state,
                currentQ: state.currentQ + 1
            }
        default:
            return state;
    }
}