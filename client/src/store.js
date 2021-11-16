import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { quizReducer } from './reducers'

export const quizStore = createStore(quizReducer, composeWithDevTools(applyMiddleware(thunk)))