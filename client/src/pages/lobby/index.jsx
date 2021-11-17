import React, {useEffect} from "react";
import { useHistory } from "react-router"
import { socket } from "../../socket";
import { useSelector, useDispatch} from "react-redux";
import { storeQuestions } from "../../actions";

export const Lobby = () => {
    let history = useHistory();
    let dispatch = useDispatch();
    let username = useSelector(state => state.username)
    let roomName = useSelector(state => state.roomName)
    let apiData = useSelector(state => state.apiData)
    
    console.log(apiData);
    const handleClick = () => {
        history.push("/quiz")
    }


    useEffect(()=>{
        socket.emit("joinRoom", username, roomName,(res)=>{
            console.log(res);
            if (res.host === username){
                socket.emit("sendData", JSON.stringify(apiData), roomName,(res)=>{})
            } else {
                socket.emit("gameData", roomName,(res)=>{

                    let gameData = JSON.parse(res.apiData);
                    console.log(gameData);
                    dispatch(storeQuestions(gameData));
                })
            }
        })
        
    },[])
   

    return (
        <>
            <button onClick={handleClick}>Go to quiz</button>
        </>
    )
}