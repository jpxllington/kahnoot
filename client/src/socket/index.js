import { socket_URL } from "../actions";

const io = require("socket.io-client");
export const socket = io(socket_URL, {
    extraHeaders: { "my-custom-header": "abcd" }
});
