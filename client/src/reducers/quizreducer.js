const init = {
    apiData: []
}

export const quizReducer = (state = init, action) => {
    switch (action.type) {
        case "STORE_QUESTIONS":
            return {
                ...state,
                apiData: action.payload
            };
        default:
            return state;
    }
}