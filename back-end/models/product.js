const mongoose = require("mongoose")

// this schema represents a Products
const productSchema = new mongoose.Schema({
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	// main product images
	coverImage: String,

	// secondary product images
	images: [{
		type: String,
		required: false
	}]
	name: String,
	description: String,
	price: Number,

	// TODO - add array of Review ObjectIds when the review schema exists

	lastUpdated: {
    type: Date,
    default: Date.now
	},
  timestamp: {
    type: Date,
    default: Date.now
  }
})


const Product = mongoose.model('Product', productSchema)

module.exports = Product



