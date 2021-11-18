import { playerReducer } from ".";


describe('playerReducer', () => {

    test('it intialises with no players, room or host', () => {
        const initReturn = playerReducer(undefined, { type: '@@INIT' })
        expect(initReturn).toEqual({  players: [],room: null,host:""})
    })


    it('update players and room on ADD_PLAYER', () => {
        const fakeRoom = playerReducer(
            {room:'',players:[] },
            { type: 'ADD_PLAYER', payload: [{room:1,player:'Jim'}]})

        expect(fakeRoom).toMatchObject({ room: 1})
    })
    

    it('sets a host on SET_HOST', () => {
        const fakeHost = playerReducer(
            {host:"" },
            { type: 'SET_HOST', payload: 'Bob'})

        expect(fakeHost).toMatchObject({ host: 'Bob'})
    })

    it('add a player on SET_PLAYER', () => {
        const fakePlayer = playerReducer(
            {players:[] },
            { type: 'SET_PLAYER', payload: 'Bob'})

        expect(fakePlayer).toMatchObject({ players: ['Bob']})
    })

})