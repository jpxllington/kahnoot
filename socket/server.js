const server = require("http").createServer();
const Game = require("./model")

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        method: ["GET","POST"],
        credentials:true
    }
});

const game = new Game();

io.on("connection", socket => {
    console.log("connected");
    socket.on("create", (roomName, username, apiData,cb) =>{
        game.addGame(username, roomName, apiData);
        socket.join(username);
        game.addPlayer(username,roomName);
        cb({
            message: "game successfully created"
        })
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

    socket.on("disconnect", (username,roomName) => {
        // console.log(socket);
        let playernum = game.deletePlayer(roomName, username)
        if(!playernum){
            game.deleteRoom(roomName)
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
    
    // io.to(roomName).emit('game-players');

    socket.on("game-start", (roomID) =>{
        io.to(roomID).emit("game-start", true)
    })

    socket.on('scores', (config, cb) => {
        let scores = game.addScore(config.room, config.username, config.score)
        io.to(config.room).emit('score',scores)

        cb({
            code: "success",
            scores:scores
        })
    })

    socket.on("check-room", (roomName,cb)=>{
        let room = game.checkRoom(roomName)
        console.log(room); 
        cb({
            roomExists:room
        })
        // if(room){

        // }
    })
    
    
})



module.exports = server;