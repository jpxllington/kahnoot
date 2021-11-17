import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App.jsx';
import { quizStore } from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={quizStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
