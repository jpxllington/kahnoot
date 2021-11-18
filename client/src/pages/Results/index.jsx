import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import he from 'he';
import './style.css'
import { socket } from '../../socket';
import { addPlayers } from "../../actions"

export const Results = () => {
    // Get correct answers of quiz
    const apiData = useSelector(state => state.quiz.apiData);
    const correctAnswers = apiData.map(a => he.decode(a.correct_answer));
    // Get current user's answers
    const finalAnswers = useSelector(state => state.quiz.finalAnswers);
    // Get all player usernames, scores
    const players = useSelector(state => state.user.players);

    const score = useSelector(state => state.quiz.score);
    const roomName = useSelector(state => state.quiz.roomName);
    const username = useSelector(state => state.quiz.username);
    
    useEffect(() => {
        socket.emit("sendScore", score, roomName, username)
    })

    socket.on("shareScore", (players) => {
        console.log(players);
        dispatch(addPlayers(players))
    })

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
