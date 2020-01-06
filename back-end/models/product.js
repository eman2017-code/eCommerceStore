const mongoose = require("mongoose")


// this schema represents a Products
const productSchema = new mongoose.Schema({
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	sku: {
		type: Number,
		required: true
	},
	upc: {
		type: String,
		required: true
	},
	manufacturer: {
		type: String,
		required: true
	},
	model: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	coverImage: { // stores the path to the image
		type: String, 
		default: null
	},	
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	category: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category' 
	}],
	price: {
		type: Number,
		required: true
	},
	shippingPrice: {
		type: Number,
		required: true
	},
	isOnSale: {
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

// uploads a product image 
productSchema.statics.uploadProductImage = function(imageFile) {
	imageFile.mv(`${__dirname}/../public/images/products/${imageFile.name}`, function(error) {
		if (error) {
	      return res.status(500).send(error)
	    }
	})
}

const Product = mongoose.model('Product', productSchema)

module.exports = Product



