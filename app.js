const express = require("express");
const routes = require("./routes");
const nunjucks = require("nunjucks");
const { SECRET_KEY, PORT } = require("./config");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

nunjucks.configure("templates", {
  autoescape: true,
  express: app,
});

app.use(express.static("public"));

app.use(cookieParser());
app.use(routes);

app.listen(PORT, () => console.log(`listening on ${PORT}`));

module.exports = app;
