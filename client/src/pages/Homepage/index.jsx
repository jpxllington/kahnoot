import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { socket } from '../../socket';
import { useDispatch } from "react-redux"
import { setRoom } from "../../actions";

export const HomePage = () => {
    let history = useHistory();
    const [message, setMessage] = useState("")
    const [submitter, setSubmitter] = useState("")
    let dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(submitter);
        let room = e.target.gameID.value
        let username = e.target.username.value
        dispatch(setRoom(username, room))
        console.log(room);
        if (submitter === "Join Game") {
            socket.emit("check-room", room, (res) => {
                console.log(res);
                if (res.roomExists) {
                    history.push('/lobby')
                } else {
                    setMessage("This room doesn't exist")
                    setTimeout(() => {
                        setMessage("")
                    }, 2000);
                }

            })
            socket.on("check-room", console.log())
        } else {
            socket.emit("check-room", room, (res) => {
                console.log(res);
                if (res.roomExists) {
                    setMessage("This room already exists")
                    setTimeout(() => {
                        setMessage("")
                    }, 2000);
                } else {
                    history.push("/create")
                }
            })

        }
    }

    return (
        <>
            <h1>Kahnoot</h1>

            <form role="form" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" role="username" name="username" id="username" required className="username" placeholder="Enter a username" />
                <input type='text' role="gameID" name='gameID' id='gameID' required className="gameID" placeholder="Enter a game ID" />
                <input onClick={(e) => setSubmitter(e.target.value)} type="submit" role="join" value="Join Game" />
                <input onClick={(e) => setSubmitter(e.target.value)} type="submit" role="create" value="Create Game" />
            </form>
            <p className="errorMessage">{message}</p>
        </>

    )
}