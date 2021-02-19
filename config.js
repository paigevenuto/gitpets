const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PERSONAL_ACCESS_TOKEN = process.env.PERSONAL_ACCESS_TOKEN;
const TOTAL_PETS = 3;
const TESTING_MODE = process.env.TESTING_MODE;
const HOME_URL = process.env.HOME_URL;
const DATABASE_URL =
  TESTING_MODE !== "true"
    ? process.env.DATABASE_URL
    : "postgres:///gitpets_test";

module.exports = {
  SECRET_KEY,
  PORT,
  DATABASE_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  PERSONAL_ACCESS_TOKEN,
  TOTAL_PETS,
  TESTING_MODE,
  HOME_URL,
};
