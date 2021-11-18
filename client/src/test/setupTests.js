import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { quizStore } from '../store';

const WrapProviders = ({ children }) => {
  return (
    <MemoryRouter>
      <Provider store={quizStore}>
        {children}
      </Provider>
    </MemoryRouter>
  )
}

const renderWithProviders = (ui) => render(ui, { wrapper: WrapProviders })

global.renderWithProviders = renderWithProviders;
global.React = React;
global.render = render;
global.userEvent = userEvent;
