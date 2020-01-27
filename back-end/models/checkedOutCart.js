const mongoose = require('mongoose');

const checkedOutCart = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' 
    }],
    totalPrice: Number,
    timestamp: {
        type: Date,
        default: Date.now()
    }
})



