import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import he from 'he';
import './style.css'

export const Results = () => {
    // Get correct answers of quiz
    const apiData = useSelector(state => state.apiData);
    const correctAnswers = apiData.map(a => he.decode(a.correct_answer));
    // Get current user's answers
    const finalAnswers = useSelector(state => state.finalAnswers);
    // Get all player usernames, scores
    const score = useSelector(state => state.score);
    const players = [{ username: "player", score }]

    // Hard-coded to see how page looks without doing quiz
    // const finalAnswers = ["test1", "test2", "test3"];
    // const correctAnswers = ["test1", "test2", "test3"];
    // const players = [
    //     { username: "PIngu", score: 2 },
    //     { username: "Jim", score: 0 }
    // ];

    const renderPlayers = () => players.map((p, i) => {
        return (
            <tr key={i + 1}>
                <td>{p.username}</td>
                <td>{p.score}/{correctAnswers.length}</td>
            </tr>
        )
    })

    const renderAnswers = () => {
        let rows = []
        for (let i = 0; i < finalAnswers.length; i++) {
            rows.push(
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{finalAnswers[i]}</td>
                    <td>{correctAnswers[i]}</td>
                </tr>
            )
        }
        return rows
    }

    return (
        <div className="results-tables">
            <table className="results-table" id="playerScores">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {renderPlayers()}
                </tbody>
            </table>
            <table className="results-table" id="userAnswers">
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Your Answer</th>
                        <th>Correct Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {renderAnswers()}
                </tbody>
            </table>
        </div>
    )
}