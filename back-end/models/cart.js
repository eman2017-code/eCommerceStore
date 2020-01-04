const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	// TODO 
	// add array for CartItems when CartItem schema is created

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

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart




