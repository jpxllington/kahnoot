import React, {useState, useEffect} from "react";

export const GameTimer = ({duration, timerDone}) =>{

    var style = {
        '--duration': Math.floor(Number(duration)/1000)
    };
    
    useEffect(() =>{
        const timer =setTimeout(() => {
            timerDone()
        },duration)
        return () => clearTimeout(timer)    
    },[])


    return (
        <div className="countDownTimer">

        </div>
    )
}