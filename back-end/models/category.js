const mongoose = require('mongoose')



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

const Category = mongoose.model('Category', categorySchema)

module.exports = Category


