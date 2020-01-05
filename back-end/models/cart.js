const mongoose = require('mongoose')

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

// adds a cart item to the cart
cartSchema.methods.addToCart = async function(cartItemId) {
	this.cartItems.push(cartItemId)
	await this.save()
}

// removes a cart item from the cart
cartSchema.methods.removeFromCart = async function(cartItemId) {
	this.cartItems.remove(cartItemId)
	await this.save()
}

// creates a new cart
cartSchema.statics.createNewCart = async function(userId) {
	const newCart = await Cart.create({ user: userId })
	return newCart
}

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart




