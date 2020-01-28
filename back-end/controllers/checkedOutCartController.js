const express = require('express');
const CheckedOutCart = require('../models/checkedOutCart.js');
const Cart = require('../models/cart.js');
const CartItem = require('../models/cartItem.js');
const Product = require('../models/product.js');
const ElasticSearchManager = require("../managers/ElasticSearchManager.js");

const router = express.Router();


// Create Route
// this route is where a users cart gets turned into a checkedOutCart
router.post('/', async (req, res, next) => {
    const clientData = req.body.data;
    console.log('clientData:', clientData);

    const userId = req.session.userId;
    console.log('userId:', userId);

    try {
        // if the user that checked out is logged in
        if (req.session.isLoggedIn) {
            console.log('user is logged in');
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

            const newCheckedOutCart = await CheckedOutCart.create({
                user: userId,
                products: [...productsToAdd]
            })

            // removes the cart items from the users cart since they just checked out
            foundCart.cartItems = [];
            await foundCart.save()

            res.json({
                data: newCheckedOutCart,
                status: {
                    code: 201,
                    message: 'Successfully checked out'
                }
            })

        // if the user that checked out is a guest
        } else {
            console.log('user is not logged in');
            const productsToAdd = clientData.products.map(product => product.upc);
            console.log('productsToAdd:', productsToAdd);

            // connects to elasticsearch
            const elasticSearchManager = new ElasticSearchManager();

            await productsToAdd.forEach(async productId => {
                let foundProduct = await Product.findOne({ 'upc': productId });
                console.log('foundProduct:', foundProduct); 

                if (foundProduct === null) {
                    // gets the product from elasticsearch
                    const productData = await elasticSearchManager.getProductByUPC(productId);
                    productData.category = undefined;

                    // create the product so now its in mongodb
                    foundProduct = await Product.create(productData);
                }
            })

            const newCheckedOutCart = await CheckedOutCart.create({
                isGuess: true,
                guestFirstName: clientData.userInfo.firstName,
                guestLastName: clientData.userInfo.lastName,
                guestEmail: clientData.userInfo.email,
                products: [...productsToAdd]
            })
            console.log('newCheckedOutCart:', newCheckedOutCart);

            res.json({
                data: newCheckedOutCart,
                status: {
                    code: 201,
                    message: 'Successfully checked out'
                }
            })
        }

    } catch (error) {
        next(error);
    }
});


module.exports = router;


