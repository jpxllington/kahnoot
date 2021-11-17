

class Game{

    constructor(){
        this.games = [];
        this.players = [];
    }

    addGame(username,roomName, ApiData){
        let game = {
            host:username,
            room:roomName,
            players:[],
            ApiData: ApiData
        }
        this.games.push(game);
        console.log(this.games);
        return game;
    } 

    addPlayer(username, roomName){
        let player = {
            username:username, 
            score: 0
        }

        let game = this.getRoom(roomName);
        try{
            game.players.push(player)
        } catch(err){
            console.warn(err);
        }
    }

    getRoom(roomName){
        try{
            const currentGame = this.game.find(game=>game.room===roomName)
            return currentGame;

        }catch(err){
            return(null);
        }
    }

    checkRoom(roomName){
        let room = this.getRoom(roomName);
        return(!!room)
    }

    addPlayerScore(score, roomName, username){
        let room = this.getRoom(roomName);
        try{
            let player = room.players.find(player => player.username ===username)
            player.score = score;
            return room.players;
        } catch(err){
            console.warn(err);
        }
    }

    deleteRoom(roomName){
        console.log(this.games);
        let gameIndex = this.games.findIndex(game => game.roomName === roomName)

        this.games.splice(gameIndex, 1);
        return this.games
    }

    deletePlayer(roomName,username){
        let room = this.getRoom(roomName)
        if(room){
            playerIndex = room.players.findIndex(player => player.username === username)
            room.players.splice(playerIndex, 1)
            return room.players.length
        }else{
            return
        }
    }
}

module.exports = Game;