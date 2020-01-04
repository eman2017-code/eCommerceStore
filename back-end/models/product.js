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
	brand: {
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



