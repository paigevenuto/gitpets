const { DATABASE_URL } = require("./config");

const pg = require("pg");
const db = new pg.Client(DATABASE_URL);
db.connect();
module.exports = db;
