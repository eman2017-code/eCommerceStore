const mongoose = require('mongoose')
const Product = require('./product.js')


// this schema represents a category that products are apart of
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}, 
	timestamp: {
    	type: Date,
    	default: Date.now
  	}
})

// gets all of the products in the category
categorySchema.methods.getAllProducts = async function() {
	const allProducts = await Product.find({ 'category': this._id })
	return allProducts
}

const Category = mongoose.model('Category', categorySchema)

module.exports = Category


