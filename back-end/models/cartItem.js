const mongoose = require('mongoose')


const cartItemSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	}, 
	quantity: {
		type: Number,
		default: 1
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

const CartItem = mongoose.model('CartItem', cartItemSchema)

module.exports = CartItem

