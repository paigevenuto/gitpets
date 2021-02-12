const { DATABASE_URL } = require("./config");

const pg = require("pg");
// TO fix H12 errors: https://devcenter.heroku.com/articles/heroku-postgresql#heroku-postgres-ssl
const db = new pg.Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
db.connect();
module.exports = db;
