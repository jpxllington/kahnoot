import React from "react";
import { useHistory } from "react-router"

export const Lobby = () => {
    
    let history =useHistory();
    const handleClick = () => {
        history.push("/quiz")
    }
    
    
    return (
        <>
            <button onClick={handleClick}>Go to quiz</button>
        </>
    )
}