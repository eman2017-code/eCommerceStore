const express = require('express');
const CheckedOutCart = require('../models/checkedOutCart.js');
const Cart = require('../models/cart.js');
const CartItem = require('../models/cartItem.js');
const Product = require('../models/product.js');

const router = express.Router();


// Create Route
// this route is where a users cart gets turned into a checkedOutCart
router.post('/', async (req, res, next) => {
    const clientData = req.body;
    const userId = req.session.userId;

    try {
        // if the user that checked out is logged in
        if (req.session.isLoggedIn) {
            const foundCart = await Cart.findOne({ 'user': userId }).populate([{
                path: 'cartItems',
                model: CartItem,
                populate: {
                    path: 'product',
                    model: Product
                }
            }]);

            // gets all the products that are in the cart that was checked out
            const productsToAdd = foundCart.cartItems.map(cartItem => cartItem.product._id);
            console.log('productToAdd:', productsToAdd);

            // creating this document officially 'checks out' the user
            const newCheckedOutCart = await CheckedOutCart.create({
                user: userId,
                products: [...productsToAdd]
            })
            console.log('newCheckedOutCart:', newCheckedOutCart);

            // removes the cart items from the users cart since they just checked out
            foundCart.cartItems = [];
            await foundCart.save()
            console.log('foundCart after deleting cart items:', foundCart);

            res.json({
                data: newCheckedOutCart,
                status: {
                    code: 201,
                    message: 'Successfully checked out'
                }
            })

        // if the user that checked out is a guest
        } else {

        }

    } catch (error) {
        next(error);
    }
});


module.exports = router;


