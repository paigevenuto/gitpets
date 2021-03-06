const { Octokit } = require("@octokit/rest");
const { createOAuthAppAuth } = require("@octokit/auth-oauth-app");
const {
  CLIENT_ID,
  CLIENT_SECRET,
  PERSONAL_ACCESS_TOKEN,
  TESTING_MODE,
} = require("./config");
const User = require("./models/user");
const Pet = require("./models/pet");
const Species = require("./models/species");
const axios = require("axios");

// For logging to Heroku
const logging = (log) => {
  if (TESTING_MODE != "true") console.error(log);
};

const auth = createOAuthAppAuth({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

async function codeToToken(req) {
  /*
   *exchanges the OAuth code from the query string for an OAuth access token
   */

  // Returns dummy data if testing
  if (TESTING_MODE == "true") {
    return { type: "token", code: "dummydata", state: "dummydata" };
  }

  const { code, state } = req.query;
  // to get OAuth token
  const tokenAuthentication = await auth({
    type: "token",
    code, // code from OAuth web flow, see https://git.io/fhd1D
    state,
  });
  return tokenAuthentication;
  /*
   * resolves with
   *{
   *  type: 'token',
   *  tokenType: 'oauth',
   *  token: '...', [> the created oauth token <]
   *  scopes: [] [> depend on request scopes by OAuth app <]
   *}
   */
}

function generateUserStats(userData) {
  const contributionsThisWeek = () => {
    let count = 0;
    userData.contributionsCollection.contributionCalendar.weeks.forEach(
      (week) => {
        week.contributionDays.forEach((day) => {
          if (day.contributionCount > 0) count++;
        });
      }
    );
    return count;
  };
  const languagesThisWeek = () => {
    const languages = new Set();
    userData.contributionsCollection.commitContributionsByRepository.forEach(
      (repository) => {
        repository.repository.languages.nodes.forEach((node) => {
          languages.add(node.name);
        });
      }
    );
    return languages.size;
  };
  // userData.login seems to log an error to the terminal, but the data is there and the app runs anyway
  const user = {
    username: userData.login,
    user_id: userData.id,
    contributionsThisWeek: contributionsThisWeek(),
    languagesThisWeek: languagesThisWeek(),
  };
  return user;
}

async function generatePetStats(userStats) {
  let pet = await Pet.petFromUserId(userStats.user_id);
  let species = await Species.getSpecies(pet.species);

  if (pet === undefined)
    pet = {
      name: "Swarbles",
      species: 2,
      lastheart: "2021-02-13T10:16:20.126Z",
    };

  const today = new Date();
  const mostRecentHeart = new Date(pet.lastheart);
  const daysSinceHeart = (today - mostRecentHeart) / (1000 * 60 * 60 * 24); // miliseconds * seconds * hours * minutes
  let love = Math.floor(((10 - daysSinceHeart) / 10) * 160);
  let food = Math.floor((160 * userStats.contributionsThisWeek) / 7);
  let play = Math.floor((160 * userStats.languagesThisWeek) / 7);

  const trimPetStat = (number) => {
    if (number < 0) return 0;
    else if (number > 160) return 160;
    else return number;
  };

  love = trimPetStat(love);
  food = trimPetStat(food);
  play = trimPetStat(play);

  const generateMood = () => {
    if (food < species.hunger_threshold) return "hungry";
    if (play < species.sleep_threshold) return "sleepy";
    if (love < species.sadness_threshold) return "sad";
    return "happy";
  };
  const petStats = {
    name: pet.name,
    species: pet.species,
    mood: generateMood(),
    food,
    play,
    love,
  };
  return petStats;
}

async function userQuery(username) {
  /*
   *Accepts a username and returns the results of a graphql query
   */

  if (TESTING_MODE == "true") {
    return {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 4,
          weeks: [
            {
              contributionDays: [
                {
                  date: "2021-02-02T00:00:00.000+00:00",
                  contributionCount: 2,
                },
                {
                  date: "2021-02-06T00:00:00.000+00:00",
                  contributionCount: 0,
                },
              ],
            },
            {
              contributionDays: [
                {
                  date: "2021-02-08T00:00:00.000+00:00",
                  contributionCount: 1,
                },
                {
                  date: "2021-02-09T00:00:00.000+00:00",
                  contributionCount: 3,
                },
              ],
            },
          ],
        },
        commitContributionsByRepository: [
          {
            repository: {
              name: "yt-data-migrator",
              languages: {
                nodes: [
                  {
                    name: "HTML",
                  },
                  {
                    name: "Python",
                  },
                  {
                    name: "CSS",
                  },
                  {
                    name: "Bash",
                  },
                  {
                    name: "JavaScript",
                  },
                ],
              },
            },
          },
          {
            repository: {
              name: "gitpets",
              languages: {
                nodes: [
                  {
                    name: "HTML",
                  },
                  {
                    name: "JavaScript",
                  },
                  {
                    name: "CSS",
                  },
                ],
              },
            },
          },
        ],
      },
      login: "paigevenuto",
      id: "MDQ6VXNlcjM3MzI1MDk3",
    };
  }

  let today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  ).toISOString();
  today = today.toISOString();
  const query = `query{
        user(login: "${username}") {
          contributionsCollection(from:"${lastWeek}", to:"${today}") {
            contributionCalendar {
              totalContributions,
              weeks {
                contributionDays {
                  date,
                  contributionCount
                }
              }
            },
            commitContributionsByRepository {
              repository{
                name,
                languages(first:100){
                  nodes{
                    name
                  }
                }
              }
            }
          },
          login,
          id
        }
      }
    `;
  const headers = {
    authorization: `bearer ${PERSONAL_ACCESS_TOKEN}`,
  };
  const userData = await axios.post(
    "https://api.github.com/graphql",
    { query: query },
    { headers: headers }
  );
  return userData.data.data.user;
}

async function userFromToken(token) {
  /*
   *accepts an OAuth token and returns the authenticated user
   */

  // Returns dummy data if testing
  if (TESTING_MODE == "true") {
    return {
      data: {
        login: "paigevenuto",
        node_id: "MDQ6VXNlcjM3MzI1MDk3",
      },
    };
  }

  // To create a new octokit object for a request
  const octokit = new Octokit({
    auth: token.token,
    userAgent: "GitPets",
    baseUrl: "https://api.github.com",
    log: {
      debug: logging,
      info: logging,
      warn: logging,
      error: logging,
    },
    request: {
      agent: undefined,
      fetch: undefined,
      timeout: 0,
    },
  });
  const data = await octokit.users.getAuthenticated();
  return data;
}

async function oauthCsrf(req) {
  /*
   *Checkes the state/csrf token used for the OAuth flow to match
   */

  if (TESTING_MODE == "true") return true;

  const { state } = req.query;
  const csrfState = req.cookies["state"];
  return state === csrfState;
}

async function updateUserStats(username) {
  /*
   *Returns stored data if the user has been updated within the UPDATE_PERIOD
   *
   *Retrieves up-to-date user data from github
   *Generates the relevant stats
   *Updates the database
   *Returns the relevant stats
   */

  const today = new Date();
  const user = await User.get(username);
  if (user.last_updated) {
    const lastUpdate = new Date(user.last_updated);
    const minutesSinceUpdate = (today - lastUpdate) / (1000 * 60); // miliseconds * seconds
    if (minutesSinceUpdate < 5) {
      const petStats = await Pet.petFromUserId(user.user_id);
      return { userStats: user, petStats };
    }
  }

  const freshUserData = await userQuery(username);
  const userStats = generateUserStats(freshUserData);
  const petStats = await generatePetStats(userStats);
  await Pet.update(userStats.user_id, petStats);
  User.sync(username, today.toISOString());

  return { userStats, petStats };
}

module.exports = {
  userFromToken,
  oauthCsrf,
  codeToToken,
  updateUserStats,
  userQuery,
  generatePetStats,
  generateUserStats,
};
