import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from "./layout"
import * as Pages from './pages/'
import './style.css';

export const App = () => {
    return (
        <>
            <Header/>
            <Switch>
                <Route exact path="/">
                    <Pages.Homepage />
                </Route>
                <Route path="/quiz">
                    <Pages.QuizPage />
                </Route>
                <Route path="/results">
                    <Pages.Results />
                </Route>
                <Route path="/create">
                    <Pages.CreateQuiz/>
                </Route>
                <Route path="/lobby">
                    <Pages.Lobby/>
                </Route>
                <Route path="/leaderboard">
                    <Pages.Leaderboard/>
                </Route>
                <Route>
                    <h1>Page doesn't exist</h1>
                </Route>
            </Switch>
        </>
    )
};

