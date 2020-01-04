const express = require('express')
const Cart = require('../models/cart.js')
const loginRequired = require('../middleware/users/loginRequired')

const router = express.Router()


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
		next(error);
	}
})


module.exports = router