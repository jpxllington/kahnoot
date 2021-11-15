const db = require ('../db_config')

class Leaderboard {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.difficulty = data.difficulty
        this.topic = data.topic
        this.score = data.score
    }

    static get all () {
        return new Promise (async (resolve, reject) => {
            try {
                const leaderData = await db.query(`SELECT * FROM leaderboard;`)
                const leaders = leaderData.rows.map(l => new Leader(l))
                resolve(leaders);
            } catch (err) {
                reject("Error retrieving database")
            }
        })  
       
    }

    static create(quizData){
        return new Promise (async (resolve, reject) => {
            try {
                const {name, topic, difficulty, score } = quizData;
                const newQuizData = await db.query ( `INSERT INTO leaderboard (name, topic, difficulty, score)
                                                      VALUES ($1, $2, $3, $4)
                                                      RETURNING id;`, [name, topic, difficulty, score]) 
                const result = new Leaderboard (newQuizData.rows[0])
                resolve (result);
            } catch (err) {
                reject('Error creating this entry');
            }
        })
        
    }
}

module.exports = Leaderboard