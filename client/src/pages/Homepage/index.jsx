import React from 'react';
import { useHistory } from 'react-router';

export const Homepage = () => {
    let history = useHistory();
    const handleSubmit =(e) =>{
        e.preventDefault();
        console.log(e);
        let submitter = e.nativeEvent.submitter.value;
        if (submitter === "Join Game"){
            history.push('/lobby')
        }else {
            history.push("/create")
        }

    }

    return(
        <>
            <h1>Kahnoot</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" name="username" id="username" className="username" placeholder="Enter a username"/>
                <input type='text' name='gameID' id='gameID' className="gameID" placeholder="Enter a game ID"/>
                <input type="submit" value="Join Game" />
                <input type="submit" value="Create Game" />
            </form>
        </>

    )
}