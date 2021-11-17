const defaultState = {
    players: [],
    room: null,
    host:""
}

export const playerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_PLAYER":
            return {
                ...state,
                players: action.payload.player,
                room: action.payload.room
                
            };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "SET_HOST":
            return { ...state, host: action.payload };
        case "SET_PLAYER":
            return { ...state, players: action.payload };
        default:
            return state;
        
    }
}