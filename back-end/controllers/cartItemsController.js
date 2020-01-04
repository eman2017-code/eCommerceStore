const express = require('express')
const CartItem = require('../models/cartItem.js')
const loginRequired = require('../middleware/users/loginRequired')

const router = express.Router()


// Create Route
// this route create a new cart item and adds it to the users cart
router.post('/', async (req, res, next) => {
	const productId = req.body.productId

	try {
		const newCartItem = await CartItem.create({
			'product': productId 
		})

		res.json({
			data: newCartItem,
			status: {
				code: 201,
				message: 'Product added to cart'
			}
		})
	} catch (error) {
		next(error);
	}
})


module.exports = router