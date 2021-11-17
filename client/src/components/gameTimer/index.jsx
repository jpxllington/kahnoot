import React, { useState, useEffect } from "react";
import "./style.css"
export const GameTimer = ({ duration, timerDone }) => {
    const [currentTimer, setCurrentTimer] = useState(0)

    var style = {
        '--duration': Math.floor(Number(duration) / 1000)
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            //update q index
            const qIndex = currentTimer + 1
            setCurrentTimer(qIndex)
            timerDone(qIndex)
        }, duration)
        return () => clearTimeout(timer)
    }, [currentTimer])


    return (
        <div role="timer" className="countDownTimer" style={style}>

        </div>
    )
}