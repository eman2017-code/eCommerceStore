// imports enviroment variable file
require("dotenv").config();

// import installed modules here
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

// import controllers here
const usersController = require("./controllers/usersController.js");

// import middleware here
const loginRequired = require("./middleware/users.js");

// imports the database connection module
require("./db/db.js");

const PORT = process.env.PORT;
const API_PATH = "/api/v1/";
const app = express();

// setup middleware here
app.use(
  session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false
  })
);

app.use(bodyParser({
	uploadDir: '/images',
    keepExtensions: true
});
app.use(cors({ origin: "localhost:3000" }));

// setup controllers here
app.use(API_PATH + "users", usersController);

// runs the server
app.listen(PORT, () => {
  console.log("App running on PORT: ", PORT);
});
