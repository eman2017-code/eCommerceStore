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
    const userInfo = clientData.userInfo;

    try {
        // if the user that checked out is logged in
        if (req.session.isLoggedIn) {
            const userId = req.session.userId;
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
                products: [...productsToAdd],
                ...userInfo
            })
            console.log("order:", newCheckedOutCart);

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
            const productsToAdd = clientData.products.map(product => product.upc);
            console.log('productsToAdd:', productsToAdd);

            // connects to elasticsearch
            const elasticSearchManager = new ElasticSearchManager();

            const productsOrdered = [];
            for (let i = 0; i < productsToAdd.length; i++) {
                let foundProduct = await Product.findOne({ 'upc': productsToAdd[i] }); 

                if (foundProduct === null) {
                    // gets the product from elasticsearch
                    const productData = await elasticSearchManager.getProductByUPC(productsToAdd[i]);
                    productData.category = undefined;

                    // create the product so now its in mongodb
                    foundProduct = await Product.create(productData);
                }
                productsOrdered.push(foundProduct._id);
            }

            const newCheckedOutCart = await CheckedOutCart.create({
                isGuest: true,
                products: [...productsOrdered],
                ...userInfo
            });

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


