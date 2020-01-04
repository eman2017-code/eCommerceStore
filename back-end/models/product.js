const mongoose = require("mongoose")


// this schema represents a Products
const productSchema = new mongoose.Schema({
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	coverImage: String, // stores the path to the image
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	isOnSale: {
		type: Boolean,
		default: false
	},

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



