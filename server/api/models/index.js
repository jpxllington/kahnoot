const db = require('../db_config')

class Leaderboard {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.difficulty = data.difficulty
        this.topic = data.topic
        this.score = data.score
    }

    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                const leaderData = await db.query(`SELECT * FROM leaderboard;`)
                const leaders = leaderData.rows.map(l => new Leaderboard(l))
                resolve(leaders);
            } catch (err) {
                reject("Error retrieving database")
            }
        })

    }

    static findByName(name) {
        return new Promise(async (resolve, reject) => {
            try {
                let leaderData = await db.query(`SELECT * FROM leaderboard WHERE LOWER(name) = LOWER($1);`, [name]);
                if (leaderData.rows.length === 0) throw new Error(`No user with the name ${name}.`)
                resolve(leaderData.rows);
            } catch (err) {
                reject('Entry not found');
            }
        });

    }

    static create(data) {
        const { name, difficulty, topic, score } = data;
        return new Promise(async (resolve, reject) => {
            try {
                let leaderboardData = await db.query(`INSERT INTO leaderboard (name, difficulty, topic, score)
                                                      VALUES ($1, $2, $3, $4)
                                                      RETURNING *;`, [name, difficulty, topic, score])
                let result = new Leaderboard(leaderboardData.rows[0])
                resolve(result);
            } catch (err) {
                reject('Error creating this entry');
            }
        })

    }
}

module.exports = Leaderboard