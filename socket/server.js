const server = require("http").createServer();
import {Game} from "./model"
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        method: ["GET","POST"]
    }
});

const game = new Game();

io.on("connection", socket => {
    socket.on("create", (roomID, hostName, apiData) =>{
        game.addGame(roomID, hostName, apiData);
        socket.join(hostName);
        game.addPlayer(username,roomName);
    })
       
    socket.on("joinRoom", (username, roomName) => {
        game.addPlayer(username, roomName);
        socket.join(roomName);
        socket.emit(`${username} has joined`)
        let currentGame = game.getRoom(roomName)
        io.to(currentGame.host).emit("playerConnected", {
            name: username, 
            score:0
        })
    })

    socket.on("disconnect", ()=>{
        let playerIndex = rooms[roomIndex]['players'].findIndex(p => p.id ===socket.id)
        rooms[roomIndex]['players'].splice(playerIndex,1)
        if (rooms[roomIndex]['players'].length === 0){
            rooms.splice(roomIndex,1)
        } else {
            io.to(roomID).emit("players",rooms.slice(roomIndex, roomIndex + 1||rooms.length))
        }
        
    })

    socket.on("add-config", (config) => {
        game.addGame(config.host, config.room, config.amount, config.subject, config.difficulty)
        socket.join(config.host)
    })

    socket.on('game-players', (roomID) => {
        const gamePlayers = games.getPlayers(roomID)
        io.in(roomID).emit(gamePlayers);
    })
    
    io.to(roomName),emmit('game-players');

    socket.on("game-start", (roomID) =>{
        io.to(roomID).emit("game-start", true)
    })

    socket.on('scores', (config, cb) => {
        let scores = games.addScore(config.room, config.username, config.score)
        io.to(config.room).emit('score',scores)

        cb({
            code: "success",
            scores:scores
        })
    })
    
})



module.exports = server;