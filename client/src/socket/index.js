// import io from "socket.io-client";


// import {socket_URL} from "../actions";

// export const socket = io(socket_URL, {withCredentials:true});

// socket.on('connect', () => {
//     const socketID = socket.id;
//     console.log("im doing something");
// })

const io = require("socket.io-client");
export const socket = io("http://localhost:1234", {
    extraHeaders: {    "my-custom-header": "abcd"  }});
