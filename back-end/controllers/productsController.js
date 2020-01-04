const express = require("express")
const Product = require('../models/product.js')
const User = require("../models/user.js")
const adminRequired = require("../middleware/users/adminRequired.js")

const router = express.Router()


// this route is where the admin can create a new product
router.post('/', adminRequired, async (req, res, next) => {
	const clientData = req.body

	// uploads the products image
	const imageFile = req.files.coverImage
	imageFile.mv(`${__dirname}/../public/images/products/${imageFile.name}`, function(error) {
		if (error) {
      return res.status(500).send(error)
    }
	})

	try {
		// now that the file is uploaded, the new product gets created
		const newProduct = await Product.create({
			user: req.session.userId,
			name: clientData.name,
			description: clientData.description,
			price: parseFloat(clientData.price),
			coverImage: '/public/images/products/' + imageFile.name
		})

		res.send({
			data: newProduct, 
			status: {
				code: 201,
				message: 'Successfully added a new product'		
			}
		})

	} catch (error) {
		next(error);
	}	
})


module.exports = router









