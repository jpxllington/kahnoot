import { Results } from '.';
import React from 'react'
import { screen } from '@testing-library/react';

describe('Results', () => {

  beforeEach(() => {
    renderWithProviders(<Results />)
  });

  test('it renders', () => {
    const playerScores = screen.getByRole('playerScores');
    const userAnswers = screen.getByRole('userAnswers');
    expect(playerScores).toBeInTheDocument();
    expect(userAnswers).toBeInTheDocument();

  });

});