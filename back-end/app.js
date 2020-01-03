// imports enviroment variable file
require("dotenv").config();

// import installed modules here
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

// import controllers here
const usersController = require("./controllers/usersController.js")
const productsController = require("./controllers/productsController.js")


// imports the database connection module
require("./db/db.js");

const PORT = process.env.PORT;
const API_PATH = "/api/v1/";
const app = express();

// setup middleware here
app.use(session({
	secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors({ origin: "localhost:3000" }));

// setup controllers here
app.use(API_PATH + "users", usersController)
app.use(API_PATH + "products", productsController);


// runs the server
app.listen(PORT, () => {
  console.log("App running on PORT: ", PORT);
});