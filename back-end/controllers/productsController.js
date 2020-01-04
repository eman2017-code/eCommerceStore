const express = require("express")
const Product = require('../models/product.js')
const User = require("../models/user.js")
const loginRequired = require("../middleware/users/loginRequired.js")

const router = express.Router()


router.post('/upload-test/', async (req, res, next) => {
	const imageFile = req.files.file
	console.log('image file:', imageFile)

	imageFile.mv(`${__dirname}/../public/${req.body.filename}.jpg`, function(error){
		if (error) {
      return res.status(500).send(error);
    }

    res.json({file: `public/${req.body.filename}.jpg`})
	})
})


module.exports = router









