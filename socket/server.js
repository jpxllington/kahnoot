const server = require("http").createServer();

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        method: ["GET","POST"]
    }
});

const rooms = [
    {
        id:"",
        players: [{username:"", id:1},2,3,4]
    },
];

io.on("connection", socket => {
    socket.on("create", (roomID, username) => {
        socket.join(roomID);

        const roomIndex = rooms.findIndex(r => r.id === roomID);
        if(roomIndex===-1){
            rooms.push({id: roomID, players:[{username: username ,id:socket.id}]})
        } else {
            rooms[roomIndex]['players'].push({username:username, id:socket.id})
        }
        io.to(roomID).emit("players",rooms.slice(roomIndex, roomIndex + 1||rooms.length))
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