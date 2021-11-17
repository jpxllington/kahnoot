const db = require('./');
const fs = require('fs');

const seeds = fs.readFileSync(__dirname + '../db/2_seeds.sql').toString();

db.query(seeds, () => console.log('Dev database seeded'));