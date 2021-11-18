

class Game {

    constructor() {
        this.games = [];
        this.players = [];
    }

    addGame(username, roomName) {
        let game = {
            host: username,
            room: roomName,
            players: [],
            apiData: []
        }
        this.games.push(game);
        console.log(this.games);
        return game;
    }

    addPlayer(username, roomName, socketID) {
        let player = {
            username: username,
            socketID: socketID,
            score: 0
        }
        console.log(player);
        try {
            let game = this.getRoom(roomName);
            if (!!game) {
                game.players.push(player)
            }
        } catch (err) {
            console.warn(err);
        }
    }

    getRoom(roomName) {
        try {
            const currentGame = this.games.find(game => game.room === roomName)
            return currentGame;

        } catch (err) {
            return (null);
        }
    }

    checkRoom(roomName) {
        let room = this.getRoom(roomName);
        return (!!room)
    }

    addPlayerScore(score, roomName, username) {
        let room = this.getRoom(roomName);
        try {
            let player = room.players.find(player => player.username === username)
            player.score = score;
            return room.players;
        } catch (err) {
            console.warn(err);
        }
    }

    deleteRoom(roomName) {
        console.log(this.games);
        let gameIndex = this.games.findIndex(game => game.roomName === roomName)

        this.games.splice(gameIndex, 1);
        return this.games
    }

    deletePlayer(socketID) {
        for (let i = 0; i < this.games.length; i++) {
            try {
                let playerIndex = this.games[i].players.findIndex(player => player.socketID === socketID)
                if (playerIndex > -1) {
                    this.games[i].players.splice(playerIndex, 1);
                    let roomName = this.games[i].room;
                    return { updatedPlayers: this.games[i].players, roomName: roomName }
                }

            } catch (e) {
                console.warn(e);
            }
        }
        // If this point has been reached then it has not found a player
        console.log("hey");
        return { message: "No players found with that ID" };
        // let game = this.games.filter(game => !!game.players.find(player => player.socketID===socketID))
        // console.log(game.players);
        // console.log(socketID);
        // if(game.length > 0){
        //     let playerIndex = game.players.findIndex(player => player.socketID === socketID)
        //     game.splice(playerIndex, 1);
        //     return game.players

        // } else {
        //     console.log("I haven't broken yet");
        // }
        // let room = this.getRoom(roomName)
        // if(room){
        //     playerIndex = room.players.findIndex(player => player.username === username)
        //     room.players.splice(playerIndex, 1)
        //     return room.players.length
        // }else{
        //     return
        // }
    }

    addData(apiData, roomName) {

        let room = this.getRoom(roomName);

        room.apiData = apiData;
        return room
    }

}

module.exports = Game;