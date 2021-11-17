const defaultState = {
    players: [],
    room: null

}

export const playerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_PLAYER":
            return {
                ...state,
                players: action.payload.player,
                room: action.payload.room
                
            };
        case "SET ERROR":
            return { ...state, error: action.payload };
        default:
            return state;
    }
}