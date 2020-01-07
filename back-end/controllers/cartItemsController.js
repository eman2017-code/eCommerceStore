const express = require('express')
const CartItem = require('../models/cartItem.js')
const Cart = require('../models/cart.js')
const loginRequired = require('../middleware/users/loginRequired.js')

const router = express.Router()


// Create Route
// this route create a new cart item and adds it to the users cart
router.post('/', loginRequired, async (req, res, next) => {
	const productId = req.body.productId

	try {
		let foundCart = await Cart.findOne({ 'user': req.session.userId }).populate('cartItems')

		// if the user does not have a cart created then a new cart is created
		if (foundCart === null) {
			foundCart = await Cart.createNewCart(req.session.userId)
		}

		// if the product already exists as a cart item in the users cart
		if (foundCart.doesProductExist(productId)) {
			const existingCartItemId = foundCart.getExistingCartItem(productId)._id

			// gets the cart item and increases the quantity by one
			const foundCartItem = await CartItem.findById(existingCartItemId)
			foundCartItem.quantity++
			await foundCartItem.save()

			res.json({
				data: foundCartItem,
				status: {
					code: 200,
					message: 'Product added to cart'
				}  
			})

		// otherwise, a new cart item is created and added to the cart
		} else {
			const newCartItem = await CartItem.create({ 'product': productId })
			foundCart.cartItems.push(newCartItem)
			await foundCart.save()

			res.json({
				data: newCartItem,
				status: {
					code: 201,
					message: 'Product added to cart'
				}
			})
		}
	} catch (error) {
		next(error);
	}
})


// this route increases the quantity of a cart item by one
router.put('/add/quantity/:cartItemId/', async (req, res, next) => {
	try {
		const foundCartItem = await CartItem.findById(req.params.cartItemId)
		foundCartItem.quantity++
		await foundCartItem.save()

		res.json({
			data: foundCartItem,
			status: {
				code: 200,
				message: 'Product quantity successfully increased'
			}
		})

	} catch (error) {
		next(error);
	}
})


// this route decreases the quantity o a cart item by 1
router.put('/subtract/quantity/:cartItemId/', async (req, res, next) => {
	try {
		const foundCartItem = await CartItem.findById(req.params.cartItemId)

		// if theres only one cart item left, then it gets deleted
		if (foundCartItem.quantity === 1) {
			foundCartItem.delete()

			res.json({
				data: {},
				status: {
					code: 204,
					message: 'Product removed from the cart'
				}
			})

		// otherwise just decrease the quantity of the cart item
		} else {
			foundCartItem.quantity--
			await foundCartItem.save()

			res.json({
				data: foundCartItem,
				status: {
					code: 200,
					message: 'Product quantity successfully subtracted'
				}
			})
		}

	} catch (error) {
		next(error)
	}
})


// Delete Route
// this route is where cart items are removed from their cart
router.delete('/:cartItemId/', loginRequired, async (req, res, next) => {
	try {
		const deleteCartItem = await CartItem.findByIdAndRemove(req.params.cartItemId).exec()

		res.json({
			data: {},
			status: {
				code: 204,
				mesage: 'Product removed form cart'
			}
		})

	} catch (error) {
		next(error)
	}	
})



module.exports = router





