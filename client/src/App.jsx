import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as Pages from './pages/'
import './style.css';

export const App = () => {
    return (
        <>

            <Switch>
                <Route exact path="/">
                    <Pages.HomePage />
                </Route>
                <Route path="/quiz">
                    <Pages.QuizPage />
                </Route>
                <Route path="/results">
                    <Pages.Results />
                </Route>
                <Route>
                    <h1>Page doesn't exist</h1>
                </Route>
            </Switch>
        </>
    )
};

