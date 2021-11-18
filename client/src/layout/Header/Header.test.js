import React from "react";
import {  Header } from '.';
import { render, screen , fireEvent} from '@testing-library/react';


describe('Header', () => { 
    
    beforeEach(() => {
        render(<Header />)
    })

    test('it renders header', () => {
        const header = screen.getByRole('header')
        expect(header.textContent).toContain('View Leaderboards')
        expect(header.textContent).toContain('Home')
    });

    test('it renders image', () => {
        const image = screen.getByRole('image')
        expect(image).toBeInTheDocument();
    });

    
})