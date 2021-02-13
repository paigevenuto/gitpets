const { DATABASE_URL, TESTING_MODE } = require("./config");

const pg = require("pg");
// TO fix H12 errors: https://devcenter.heroku.com/articles/heroku-postgresql#heroku-postgres-ssl
//
const dbConfig = TESTING_MODE
  ? {
      connectionString: DATABASE_URL,
    }
  : {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };

const db = new pg.Client(dbConfig);
db.connect();
module.exports = db;
