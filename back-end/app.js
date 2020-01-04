// imports enviroment variable file
require("dotenv").config()

// import installed modules here
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const session = require("express-session")
const fileUpload = require('express-fileupload')

// import controllers here
const usersController = require("./controllers/usersController.js")
const productsController = require("./controllers/productsController.js")
const cartsController = require('./controllers/cartsController.js')
const cartItemsController = require('./controllers/cartItemsController.js')


// imports the database connection module
require('./db/db.js')

const PORT = process.env.PORT
const API_PATH = '/api/v1/'
const app = express()

// setup middleware here
app.use(session({
	secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false }
  })
);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(cors({ 
	origin: "localhost:3000",
	credentials: true 
}))

// file uploading
app.use(fileUpload())

// configures path for static files
app.use('/public', express.static(__dirname + '/public'))

// setup controllers here
app.use(API_PATH + 'users', usersController)
app.use(API_PATH + 'products', productsController)
app.use(API_PATH + 'carts', cartsController)
app.use(API_PATH + 'cart-items', cartItemsController)



// runs the server
app.listen(PORT, () => {
  console.log("App running on PORT: ", PORT);
})



