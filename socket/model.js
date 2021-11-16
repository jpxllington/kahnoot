const { timeStamp } = require("console");
const { threadId } = require("worker_threads");

class Game{

    constructor(){
        this.games = [];
        this.players = [];
    }

    addGame(hostID,roomID, difficulty, amount, subject){
        let game = {
            host:hostID,
            room:roomID,
            difficulty:difficulty,
            amount:amount,
            subject:subject,
            players:[],
            active:false
        }
        this.games.push(game);
        return game;
    } 

    addPlayer(username)
}