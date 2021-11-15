const Leaderboard = require('../models')

async function index(req, res) {
    try {
        const leaderboard = await Leaderboard.all;
        res.status(200).json(leaderboard)
    } catch (err) {
        res.status(500).send({err});
    }
}

async function show(req, res) {
    try {
        const leaderboard = await Leaderboard.findById(req.params.id);
        res.status(200).json(leaderboard)
    } catch (err) {
        res.status(404).json({err})
    }
}

async function create (req, res) {
    try {
        const leaderboard = await Leaderboard.create(req.body);
        res.status(201).json(leaderboard)
    } catch (err) {
        res.status(422).json({err})
    }
}

module.exports = { index, show, create }