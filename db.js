const pg = require("pg");
const db = new pg.Client("postgresql:///gitpets");
db.connect();
module.exports = db;
