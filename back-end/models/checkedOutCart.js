const mongoose = require('mongoose');

const checkedOutCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },

    // if the user does not have an account, they checkout as a guest,
    // and all of the guest information below will be filled out
    isGuest: {
        type: Boolean,
        default: false
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' 
    }],
    totalPrice: Number,
    timestamp: {
        type: Date,
        default: Date.now()
    },
    /* PayPal Payment Information */
    email: String,
    firstName: String,
    lastName: String,
    address: String,
    state: String,
    city: String,
    zipcode: Number,
    payerId: String,
    paymentId: String,
    paymentToken: String,
})

const CheckedOutCart = new mongoose.model('CheckedOutCart', checkedOutCartSchema);

module.exports = CheckedOutCart;


