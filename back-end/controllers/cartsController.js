const express = require('express')
const Cart = require('../models/cart.js')
const loginRequired = require('../middleware/users/loginRequired')

const router = express.Router()


// Show Route
// this route shows a single cart
router.get('/:cartId/', loginRequired, async (req, res, next) => {
	try {
		const foundCart = await Cart.findById(req.params.cartId)

		res.json({
			data: foundCart,
			status: {
				code: 200,
				message: 'Successfully found cart'
			}
		}) 	
	} catch (error) {
		next(error)
	}	
})


// Create Route 
// this route is where a users cart is created
router.post('/', loginRequired, async (req, res, next) => {
	try {
		const newCart = await Cart.create({
			user: req.session.userId
		})

		res.json({
			data: newCart,
			status: {
				code: 201,
				message: 'Successfully created cart'
			}
		})
	} catch (error) {
		next(error)
	}
})

// Add Cart Item Route
// this route is where a cart item in added to a cart
router.put('/add/', loginRequired, async (req, res, next) => {
	const cartItemId = req.body.cartItemId

	try {
		const foundCart = await Cart.findOne({'user': req.session.userId})

		// adds the product id to the carts items
		foundCart.cartItems.push(cartItemId)

		res.json({
			data: foundCart.populate('cartItems'),
			status: {
				code: 200,
				message: 'Product successfully added to the cart'
			}
		})
	} catch (error) {
		next(error)
	}	
})


module.exports = router

