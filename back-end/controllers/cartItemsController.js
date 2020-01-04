const express = require('express')
const CartItem = require('../models/cartItem.js')
const Cart = require('../models/cart.js')
const loginRequired = require('../middleware/users/loginRequired')

const router = express.Router()


// Create Route
// this route create a new cart item and adds it to the users cart
router.post('/', async (req, res, next) => {
	const productId = req.body.productId

	try {
		const foundCart = await Cart.findOne({'user': req.session.userId})

		const newCartItem = await CartItem.create({
			'product': productId 
		})

		// adds the new cart item to the users cart 
		
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