const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT;
const DATABASE_URL = process.env.NODE_ENV;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PERSONAL_ACCESS_TOKEN = process.env.PERSONAL_ACCESS_TOKEN;
const TOTAL_PETS = 3;
const TESTING_MODE = process.env.TESTING_MODE || false;

module.exports = {
  SECRET_KEY,
  PORT,
  DB_URI,
  CLIENT_ID,
  CLIENT_SECRET,
  PERSONAL_ACCESS_TOKEN,
  TOTAL_PETS,
  TESTING_MODE,
};
