const mongoose = require('mongoose')
const CartItem = require('./cartItem.js')

const cartSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	// this fields is an array that contains all of the items in the cart
	cartItems: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'CartItem'
	}],
	// total cost of all the items in the cart
	totalCost: {
		type: Number,
		defualt: 0
	},
	hasPaid: {
		type: Boolean,
		default: false
	},
	lastUpdated: {
    	type: Date,
    	default: Date.now
	},
  	timestamp: {
    	type: Date,
    	default: Date.now
  	}
})

// checks if a cart item already exists in a cart
cartSchema.methods.doesProductExist = function(productIdToCheck) {
	const foundCartItems = this.cartItems
	
	// creates an array of product ids in each cart items 
	const productIds = foundCartItems.map(cartItem => cartItem.product)

	return productIds.includes(productIdToCheck)
}

// searches for a cart item in the cart by a product id and returns the cat item
cartSchema.methods.getExistingCartItem = function(productId) {
	const foundCartItems = this.cartItems
	return foundCartItems.filter(cartItem => cartItem.product == productId)[0]
}

// creates a new cart
cartSchema.statics.createNewCart = async function(userId) {
	const newCart = await Cart.create({ user: userId })
	return newCart
}

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart




