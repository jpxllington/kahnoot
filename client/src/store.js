import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { quizReducer, playerReducer } from './reducers'

const rootReducer = combineReducers({
    quizReducer, // key name same as the carefully renamed default export
    user: playerReducer // specific key name instead of the variable name
    
  })



export const quizStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))