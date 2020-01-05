const express = require('express')
const CartItem = require('../models/cartItem.js')
const Cart = require('../models/cart.js')
const loginRequired = require('../middleware/users/loginRequired')

const router = express.Router()


// Create Route
// this route create a new cart item and adds it to the users cart
router.post('/', loginRequired, async (req, res, next) => {
	const productId = req.body.productId

	try {
		let foundCart = await Cart.findOne({'user': req.session.userId}).populate('cartItems')

		// if the user does not have a cart created then a new cart is created
		if (foundCart === null) {
			foundCart = await Cart.createNewCart(req.session.userId)
		}

		let newCartItem

		// if the product already exists as a cart item in the users cart
		if (foundCart.doesProductExist(productId)) {
			const existingCartItemId = foundCart.getExistingCartItem(productId)._id
			console.log('existingCartItemId:', existingCartItemId)

			const existingCartItem = await CartItem.findById(existingCartItemId)

			existingCartItem.quantity++
			await existingCartItem.save()

		} else {
			newCartItem = await CartItem.create({
				'product': productId 
			})

			foundCart.cartItems.push(newCartItem)
			await foundCart.save()
		}
	

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


// Delete Route
// this route is where cart items are removed from their cart
router.delete('/:cartItemId', loginRequired, async (req, res, next) => {
	try {
		const foundCart = await Cart.findOne({ 'user': req.session.userId })

		foundCart.removeFromCart(req.params.cartItemId)

		res.json({
			data: {},
			status: {
				code: 204,
				mesage: 'Product removed form cart'
			}
		})

	} catch (error) {
		next(error);
	}	
})



module.exports = router





