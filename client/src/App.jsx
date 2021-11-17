import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { HomePage } from './pages/Homepage'
import './style.css';

export const App = () => {
    return (
        <>
            
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                
                <Route>
                    <h1>Page doesn't exist</h1>
                </Route>
            </Switch>
        </>
    )
};

