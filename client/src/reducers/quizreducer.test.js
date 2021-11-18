import { quizReducer } from ".";


describe('quizReducer', () => {

    test('it intialises the data', () => {
        const initReturn = quizReducer(undefined, { type: '@@INIT' })
        expect(initReturn).toEqual({  apiData: [],
                correctAnswer: "",currentAnswer: "",
                finalAnswers: [],currentQ: 0,score: 0,
                roomName:"", username: "",})
    })


    it('update players and room on STORE_QUESTIONS', () => {
        const fakeStore = quizReducer(
            { apiData: [], finalAnswers: []},
            { type: 'STORE_QUESTIONS', payload: "questions"})

        expect(fakeStore).toMatchObject({ apiData: "questions", finalAnswers: [],currentQ: 0,
            score: 0})
    })
    

    it('it sets the correct answer on SET_CORRECT_ANSWER', () => {
        const fakeAnswer = quizReducer(
            {correctAnswer:"" },
            { type: 'SET_CORRECT_ANSWER', payload: 'Silver'})

        expect(fakeAnswer).toMatchObject({ correctAnswer: 'Silver'})
    })

    it('it sets the current answer on SET_CURRENT_ANSWER', () => {
        const fakeCurrentAnswer = quizReducer(
            {currentAnswer:"" },
            { type: 'SET_CURRENT_ANSWER', payload: 'Gold'})

        expect(fakeCurrentAnswer).toMatchObject({ currentAnswer: 'Gold'})
    })

    it('it gos to next question and add the current answer to final answers on CHANGE_QUESTION', () => {
        const fakeQuestion = quizReducer(
            {currentQ:1, currentAnswer:"Gold" ,finalAnswers:['Cat']},
            { type: 'CHANGE_QUESTION'})

        expect(fakeQuestion).toMatchObject({ currentQ:2,finalAnswers: ['Cat','Gold']})
    })

    it('it adds the current answer to final answers on END_QUIZ', () => {
        const fakeQuiz = quizReducer(
            {currentAnswer:"Gold" ,finalAnswers:['Cat']},
            { type: 'END_QUIZ'})

        expect(fakeQuiz).toMatchObject({finalAnswers: ['Cat','Gold']})
    })

    it('it adds the current answer to final answers on SET_ROOM', () => {
        const fakeRoom = quizReducer(
            {roomName:"" ,username:""},
            { type: 'SET_ROOM',payload: {roomName:"room_1", username:'Bob'}})

        expect(fakeRoom).toMatchObject({roomName:"room_1", username:'Bob'})
    })


    it('it sets an error on SET_ERROR', () => {
        const fakeError = quizReducer(
            {},
            { type: 'SET_ERROR',payload: "Oops, error!"})

        expect(fakeError).toMatchObject({error:'Oops, error!'})
    })

    

    

})