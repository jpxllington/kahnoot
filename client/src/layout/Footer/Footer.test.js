import React from "react";
import { Footer } from '.';
import { render, screen } from '@testing-library/react';



describe('Footer', () => {

    test('it renders', () => {
        render(<Footer />)
        const footer = screen.getByRole('footer')
        expect(footer.textContent).toContain('Calum, Cameron, Golnar, James, Olu © 2021')
    });
})