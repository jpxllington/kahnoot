import { Results } from '.';
import React from 'react'
import { screen } from '@testing-library/react';

describe('Results', () => {

  beforeEach(() => {
    renderWithProviders(<Results />)
  });

  test('it renders', () => {
    const text = screen.getByRole('p')
    expect(text.textContent).toContain('You scored')

  });

});