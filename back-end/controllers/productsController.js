const express = require("express")
const Product = require('../models/product.js')
const User = require("../models/user.js")
const adminRequired = require("../middleware/users/adminRequired.js")

const router = express.Router()



// Create Route
// this route is where the admin can create a new product
router.post('/', adminRequired, async (req, res, next) => {
	const clientData = req.body
	const imageFile = req.files.coverImage

	// uploads the products image
	Product.uploadProductImage(imageFile)

	try {
		// now that the file is uploaded, the new product gets created
		const newProduct = await Product.create({
			postedBy: req.session.userId,
			name: clientData.name,
			brand: clientData.brand,
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


// Show Route
// this route returns data for a single product
router.get('/:productId/', async (req, res, next) => {
	const clientData = req.body

	try {
		const foundProduct = await Product.findOne({'_id': req.params.productId}).populate('postedBy')

		res.json({
			data: foundProduct,
			status: {
				code: 200,
				message: 'Successfully found product'			
			}
		})
	} catch (error) {
		next(error);
	}
})


// router.put('/:productId', adminRequired, async (req, res, next) => {
// 	const clientData = req.body
// 	const newImageFile = req.files.coverImage


	
// 		imageFile.mv(`${__dirname}/../public/images/products/${imageFile.name}`, function(error) {
// 			if (error) {
// 	      		return res.status(500).send(error)
// 	    	}
// 		})
	

// })





module.exports = router









