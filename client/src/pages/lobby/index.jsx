
import { PlayerCard } from "../../components/PlayerCard"
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { socket } from "../../socket";
import { useSelector, useDispatch } from "react-redux";
import { storeQuestions, setHost, addPlayers } from "../../actions";


export const Lobby = () => {
    let history = useHistory();
    let dispatch = useDispatch();
    let username = useSelector(state => state.quiz.username)
    let roomName = useSelector(state => state.quiz.roomName)
    let apiData = useSelector(state => state.quiz.apiData)
    const [hostyBOi, setHostyBOi] = useState(false)
    const room = useSelector(state => state.user.room)
    const players = useSelector(state => state.user.players)

    console.log(apiData);
    const handleClick = () => {
        console.log("button pressed");
        socket.emit("game-start-request", (res)=>{

        })
    }

    socket.on("game-start", (cb)=>{
        history.push("/quiz")
    })

    useEffect(() => {
        socket.emit("joinRoom", username, roomName, (res) => {
            console.log(res);
            dispatch(setHost(res.host))
            dispatch(addPlayers(res.players))
            if (res.host === username) {
                socket.emit("sendData", JSON.stringify(apiData), roomName, (res) => { })
                setHostyBOi(true)
            } else {
                socket.emit("gameData", roomName, (res) => {

                    let gameData = JSON.parse(res.apiData);
                    console.log(gameData);
                    dispatch(storeQuestions(gameData));
                })
            }
        })

    }, [])


    return (
        <>
            {players.map((player) => <PlayerCard role="playerCard" key={players.indexOf(player)} player={player} />)}
            { hostyBOi ? <button role="quiz" onClick={handleClick}>Go to quiz</button> : <p role="quiz">Waiting for host to start quiz</p>}
        </>
    )
}