const { DATABASE_URL, TESTING_MODE } = require("./config");

const pg = require("pg");
// TO fix H12 errors: https://devcenter.heroku.com/articles/heroku-postgresql#heroku-postgres-ssl
//
const dbConfig =
  TESTING_MODE === "true"
    ? {
        connectionString: DATABASE_URL,
      }
    : {
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      };

const db = new pg.Client(dbConfig);
db.connect();
console.log(`database connection: ${DATABASE_URL}`);
module.exports = db;
