TESTING_MODE = "true";
const {
  generatePetStats,
  generateUserStats,
  userQuery,
} = require("../github-helpers");

describe("Calculates user stats", function () {
  test("Calculates user stats", async function () {
    // sets user to dummy data
    const user = await userQuery("paigevenuto");
    const userStats = generateUserStats(user);
    expect(userStats).toEqual({
      username: "paigevenuto",
      user_id: "MDQ6VXNlcjM3MzI1MDk3",
      contributionsThisWeek: 3,
      languagesThisWeek: 5,
    });
  });
});

describe("Calculates pet stats", function () {
  test("Calculates pet stats", async function () {
    // sets user to dummy data
    const user = await userQuery("paigevenuto");
    const userStats = generateUserStats(user);
    const petStats = generatePetStats(userStats, true);
  });
});
