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

        socket.on("disconnect", ()=>{
            let playerIndex = rooms[roomIndex]['players'].findIndex(p => p.id ===socket.id)
            rooms[roomIndex]['players'].splice(playerIndex,1)
            if (rooms[roomIndex]['players'].length === 0){
                rooms.splice(roomIndex,1)
            } else {
                io.to(roomID).emit("players",rooms.slice(roomIndex, roomIndex + 1||rooms.length))
            }
            
        })
    })
})



module.exports = server;