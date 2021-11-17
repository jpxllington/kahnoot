const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const leaderRoutes = require ('./routes')
// Root route
server.get('/', (req, res) => res.send('Welcome to Kahnoot!'))
server.use('/leaderboard', leaderRoutes)
module.exports = server