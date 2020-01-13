const express = require('express')
const Cart = require('../models/cart.js')
const loginRequired = require('../middleware/users/loginRequired')

const router = express.Router()


// * for testing purposes *
// Index Route 
// this route return all of the carts in the database
router.get('/', loginRequired, async (req, res, next) => {
	try {
		const allCarts = await Cart.find({}).populate('user').populate('cartItems')

		res.send({
			data: allCarts,
			status: {
				'code': 200,
				'message': 'Successfully found all the carts'
			}
		})		
	} catch (error) {
		next(error)
	}	
})


// Show Route
// this route shows a single cart
router.get('/:userId/', loginRequired, async (req, res, next) => {
	try {
		const foundCart = await Cart.findOne({ 'user': req.params.userId })

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



module.exports = router

