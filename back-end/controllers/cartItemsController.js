const express = require('express')
const CartItem = require('../models/cartItem.js')
const Cart = require('../models/cart.js')
const Product = require('../models/product.js')
const loginRequired = require('../middleware/users/loginRequired.js')

const router = express.Router()


// Create Route
// this route create a new cart item and adds it to the users cart
router.post('/', loginRequired, async (req, res, next) => {
	const productId = req.body.productId

	try {
		const foundCart = await Cart.findOne({ 'user': req.session.userId }).populate([{
			path: 'cartItems',
			model: CartItem,
			populate: {
				path: 'product',
				model: Product
			}
		}])

		// if the product already exists as a cart item in the users cart
		if (foundCart.doesProductExist(productId)) {

			// gets the existing cart item and increases the quantity
			const existingCartItem = foundCart.getExistingCartItem(productId)
			existingCartItem.quantity++
			existingCartItem.setTotalCost()
			await existingCartItem.save()

			res.json({
				data: existingCartItem,
				status: {
					code: 200,
					message: 'Product added to cart'
				}  
			})

		// otherwise, a new cart item is created and added to the cart
		} else {
			const newCartItem = await CartItem.create({ 'product': productId })
			foundCart.cartItems.push(newCartItem)
			await foundCart.setTotalCost()
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
		next(error)
	}
})


// Update Route
// this route is where users can update the quantity of a cart item
router.put('/:cartItemId/', loginRequired, async (req, res, next) => {
	const newQuantity = req.body.quantity

	try {
		const foundCartItem = await CartItem.findById(req.params.cartItemId)
		foundCartItem.quantity = newQuantity
		await foundCartItem.save()

		res.json({
			data: foundCartItem,
			status: {
				code: 200,
				message: 'Product quantity successfully increased'
			}
		})
				
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





