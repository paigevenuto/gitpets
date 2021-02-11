const express = require("express");
const User = require("./models/user");
const Pet = require("./models/pet");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const { SECRET_KEY, TOTAL_PETS, CLIENT_ID } = require("./config");
const csrf = require("csurf");
const { body, validationResult } = require("express-validator");
const {
  userFromToken,
  oauthCsrf,
  codeToToken,
  getUserData,
  updateUserStats,
} = require("./github-helpers");
const { resumeDrain } = require("./db");

const csrfProtection = csrf({ cookie: true });

function requireLogin(req, res, next) {
  const token = req.cookies["login"];
  if (jwt.verify(token, SECRET_KEY)) {
    return next();
  } else {
    return redirect("/");
  }
}

router.get("/", csrfProtection, async function (req, res, next) {
  try {
    const state = req.csrfToken();
    res.cookie("state", state);
    const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&state=${state}`;
    return res.render("home.html", { url });
  } catch (err) {
    return next(err);
  }
});

router.get("/oauth_callback", async function (req, res, next) {
  try {
    if (oauthCsrf(req)) {
      const token = await codeToToken(req);
      const user = await userFromToken(token);
      const jwtToken = jwt.sign({ userId: user.node_id }, SECRET_KEY, {
        expiresIn: "14d",
      });
      res.cookie("login", jwtToken);
      await User.update(user);
      return res.redirect("/choose_pet");
    }
    return res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

router.get("/user", requireLogin, async function (req, res, next) {
  try {
    const token = req.cookies["login"];
    if (jwt.verify(token, SECRET_KEY)) {
      const user_id = jwt.verify(token, SECRET_KEY).user_id;
      const username = User.usernameFromID(user_id);
      return res.redirect(`/user/${username}`);
    }
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
});

router.get("/user/:username", async function (req, res, next) {
  try {
    const { username } = req.params;
    const { userStats, petStats } = await updateUserStats(username);

    const token = req.cookies["login"] ? req.cookies["login"] : false;
    const loggedIn = token ? Boolean(jwt.verify(token, SECRET_KEY)) : false;

    return res.render("profile.html", {
      loggedIn,
      user: userStats,
      pet: petStats,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
});

router.get("/heart/:username", async function (req, res, next) {
  try {
    const { username } = req.params;
    Pet.giveHeart(username);
    return res.redirect(`/user/${username}`);
  } catch (err) {
    return next(err);
  }
});

router.get("/pet/:username", async function (req, res, next) {
  try {
    const { username } = req.params;
    const { petStats } = await updateUserStats(username);
    console.log(petStats);

    res.type("svg");
    return res.render("pet_stats.svg", { pet: petStats });
  } catch (err) {
    return next(err);
  }
});

router.get("/choose_pet", requireLogin, async function (req, res, next) {
  try {
    const pets = [...Array(TOTAL_PETS).keys()].map((idx) => {
      return { species: idx + 1 };
    });
    return res.render("choose_pet.html", { pets: pets });
  } catch (err) {
    return next(err);
  }
});

router.post(
  "/choose_pet",
  requireLogin,
  [
    body("name").trim().escape().isLength({ min: 1, max: 15 }),
    body("species").trim().isInt({ min: 1, max: TOTAL_PETS }),
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { name, species } = req.body;
      const user_id = jwt.verify(token, SECRET_KEY).user_id;
      Pet.choosePet(user_id, species, name);
      return res.redirect("/choose_pet");
    }
    try {
      const { name, species } = req.body;
      return res.redirect("/user");
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
