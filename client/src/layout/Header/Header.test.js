import React from "react";
import {  Header } from '.';
import { render, screen , fireEvent} from '@testing-library/react';


describe('Header', () => {  

    test('it renders', () => {
        render(<Header />)
        const header = screen.getByRole('header')
        expect(header.textContent).toContain('View Leaderboards')
        expect(header.textContent).toContain('Home')

    });
})