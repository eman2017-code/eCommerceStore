const mongoose = require('mongoose')
const Product = require('./product.js')


// this schema represents a category that products are apart of
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}, 
	products: [{
		type: mongoose.Schema.Types.ObjectId
	}],
	timestamp: {
    	type: Date,
    	default: Date.now
  	}
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category


