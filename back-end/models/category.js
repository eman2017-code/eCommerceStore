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

// adds the category to the new products
categorySchema.methods.addCategoryToProducts = function(newProductIds) {
	newProductIds.forEach(async (id) => {
		const foundProduct = await Product.findById(id)
		foundProduct.category.push(this._id)
		await foundProduct.save()	
	})
}

categorySchema.methods.getNewlyAddedProductIds = function(newProductIds) {
	return newProductIds.filter(id => !this.products.includes(id))
}

// gets all the product ids that 
categorySchema.methods.getRemovedProductIds = function(newProductIds) {
	return this.products.filter(id => !newProductIds.includes(id))
}

const Category = mongoose.model('Category', categorySchema)

module.exports = Category


