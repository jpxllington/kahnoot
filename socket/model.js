const { timeStamp } = require("console");
const { threadId } = require("worker_threads");

export class Game{

    constructor(){
        this.games = [];
        this.players = [];
    }

    addGame(hostID,roomName, ApiData){
        let game = {
            host:hostID,
            room:roomName,
            players:[],
            ApiData: ApiData
        }
        this.games.push(game);
        return game;
    } 

    addPlayer(username, roomName){
        let player = {
            username:username, 
            score: 0
        }

        let game = getRoom(roomName);
        try{
            game.players.push(player)
        } catch(err){
            console.warn(err);
        }
    }

    getRoom(roomName){
        const currentGame = this.game.find(game=>game.room===roomName)
        return currentGame;
    }

    checkRoom(roomName){
        let room = getRoom(roomName);
        return(!!room)
    }

    addPlayerScore(score, roomName, username){
        let room = getRoom(roomName);
        try{
            let player = room.players.find(player => player.username ===username)
            player.score = score;
            return room.players;
        } catch(err){
            console.warn(err);
        }
    }
}
