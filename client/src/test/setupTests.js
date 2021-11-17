import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { quizReducer } from "../reducers";

const TestProviders = ({ initState}) => {
  initState ||= {
    apiData: [],
    correctAnswer: "",
    currentAnswer: "",
    finalAnswers: [],
    currentQ: 0,
    score: 0
  };
 
  let testReducer = () => quizReducer(initState, { type: "@@INIT" });

  const testStore = createStore(testReducer, applyMiddleware(thunk));

  return ({ children }) => <Provider store={testStore}>{children}</Provider>;
};

const renderWithReduxProvider = (ui, options = {}) => {
  let TestWrapper = TestProviders(options);
  render(ui, { wrapper: TestWrapper, ...options });
};

import axios from "axios";
jest.mock("axios");

axios.get.mockResolvedValue({
  data: [
    {
        correctAnswer: "Silver",
        currentAnswer: "Gold",
    },
  ],
});

global.renderWithReduxProvider = renderWithReduxProvider;
global.React = React;
global.render = render;
global.userEvent = userEvent;
