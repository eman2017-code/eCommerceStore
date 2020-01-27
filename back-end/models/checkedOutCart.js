const mongoose = require('mongoose');

const checkedOutCartSchema = new mongoose.Schema({
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

const CheckedOutCart = new mongoose.model('CheckedOutCart', checkedOutCartSchema);

module.exports = CheckedOutCart;


