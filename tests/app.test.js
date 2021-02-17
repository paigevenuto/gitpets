const app = require("../app");
const request = require("superagent");
const db = require("../db");
TESTING_MODE = "true";
const { HOME_URL } = require("../config");

beforeAll(async function () {
  await db.query(`DELETE FROM users`);
  await db.query(`DELETE FROM pets`);
});

afterAll(async function () {
  await db.query(`DELETE FROM users`);
  await db.query(`DELETE FROM pets`);
});

describe("Tests user flow", function () {
  const paige = request.agent();

  test("Home page functionality", async function () {
    const resp = await paige.get(`${HOME_URL}/`);
    expect(resp.statusCode).toBe(200);
    expect(resp.text).toContain(
      "https://github.com/login/oauth/authorize?client_id="
    );
  });
  test("Oauth callback process works", async function () {
    const resp = await paige.get(`${HOME_URL}/oauth_callback`);
    expect(resp.text).toContain("Choose your pet");
  });
  test("Pet options view works", async function () {
    const resp = await paige.get(`${HOME_URL}/choose_pet`);
    expect(resp.statusCode).toBe(200);
    expect(resp.text).toContain("Choose your pet");
  });
  test("Pet selection works", async function () {
    const resp = await paige.post(`${HOME_URL}/choose_pet`).send({
      species: 2,
      name: "Swarbles",
    });

    expect(resp.text).toContain("Show pet in your readme!");
    expect(resp.text).toContain("paigevenuto's pet Swarbles");
  });
});
