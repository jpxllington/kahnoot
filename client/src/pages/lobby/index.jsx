
import { PlayerCard } from "../../components/PlayerCard"
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { socket } from "../../socket";
import { useSelector, useDispatch } from "react-redux";
import { storeQuestions, setHost, addPlayers } from "../../actions";
import './style.css'




export const Lobby = () => {
    let history = useHistory();
    let dispatch = useDispatch();
    let username = useSelector(state => state.quiz.username)
    let roomName = useSelector(state => state.quiz.roomName)
    let apiData = useSelector(state => state.quiz.apiData)
    const [hostyBOi, setHostyBOi] = useState(false)
    const room = useSelector(state => state.user.room)
    const players = useSelector(state => state.user.players)
    
    const handleClick = () => {
        socket.emit("game-start-request", roomName,(res)=>{

            console.log("button pressed");
        })
    }

    socket.on("game-start", ()=>{
        console.log("game started");
        history.push("/quiz")
    })

    useEffect(() => {
        if (!roomName){
            history.push("/")
        } else{
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

        }

    }, [])


    socket.on("updatedPlayers", (players) => {
        dispatch(addPlayers(players));
    })


    return (
        <div id="lobbyPage">
            <div className="lobbyContents">
                <div id="playerList">
                    {!!players && players.map((player) => <PlayerCard key={players.indexOf(player)} username={player.username} />)}
                </div>
                { hostyBOi ? <button id='g2quiz' onClick={handleClick}>Go to quiz</button> : <p>Waiting for host to start quiz</p>}

            </div>
        </div>
    )
}
