const mongoose = require("mongoose")


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


