import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { socket } from '../../socket';
import { useDispatch } from "react-redux"
import { setRoom } from "../../actions";
import './style.css'
import Title from '../../../assets/kahnootLogoColored_transparent.png';

export const HomePage = () => {
    let history = useHistory();
    const [formData, setFormData] = useState({ username: "", gameID: "" })
    const [message, setMessage] = useState("")
    const [submitter, setSubmitter] = useState("")
    let dispatch = useDispatch();

    const handleInput = e => {
        // using destructuring to access e.target.name and e.target.value
        const { name, value } = e.target;
        // note the use of the [square brackets] here so we can use the name variable (instead of accessing a key of .name)
        setFormData({ ...formData, [name]: value });
    };

    useEffect(()=>{
        socket.connect();

    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(submitter);
        let username = formData.username;
        let room = formData.gameID;
        dispatch(setRoom(username, room))
        console.log(room);
        if (submitter === "Join Game") {
            console.log("Join game has been pressed");
            socket.emit("check-room", room, (res) => {
                console.log(`Res: ${res}`);
                if (res.roomExists) {
                    setMessage("Joining Game...")
                    setTimeout(() => {
                        history.push('/lobby')
                    }, 1000);
                } else {
                    setMessage("This room doesn't exist")
                    setTimeout(() => {
                        setMessage("")
                    }, 2000);
                }

            })
            // socket.on("check-room", console.log("room checked"))
        } else {
            socket.emit("check-room", room, (res) => {
                console.log(res);
                if (res.roomExists) {
                    setMessage("This room already exists")
                    setTimeout(() => {
                        setMessage("")
                    }, 2000);
                } else {
                    setMessage("Creating Room...");
                    setTimeout(() => {
                        history.push("/create")
                    }, 1000)
                }
            })

        }
    }

    return (

        <div id="homepage" className="pageSection">
            <form role="form" onSubmit={(e) => handleSubmit(e)} id="frontPageForm">
                <input
                    type="text" role="username"
                    name="username" id="username" required
                    className="username" placeholder="Enter a username"
                    value={formData.username} onChange={handleInput}
                    maxLength='20'
                />
                <input
                    type='text' role="gameID"
                    name='gameID' id='gameID' required
                    className="gameID" placeholder="Enter a game ID"
                    value={formData.gameID} onChange={handleInput}
                    maxLength='12'
                />
                <input onClick={(e) => setSubmitter(e.target.value)} type="submit" role="join" value="Join Game" />
                <input onClick={(e) => setSubmitter(e.target.value)} type="submit" role="create" value="Create Game" />

            </form>
            <p className="errorMessage">{message}</p>
        </div>

    )
}