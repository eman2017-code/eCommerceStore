const express = require("express");
const CartItem = require("../models/cartItem.js");
const Cart = require("../models/cart.js");
const Product = require("../models/product.js");
const loginRequired = require("../middleware/users/loginRequired.js");
const ElasticSearchManager = require("../managers/ElasticSearchManager.js");

const router = express.Router();

// Create Route
// this route create a new cart item and adds it to the users cart
router.post("/", loginRequired, async (req, res, next) => {
  const productId = req.body.productId
  const quantity = req.body.quantity

  try {
    const foundCart = await Cart.findOne({ user: req.session.userId }).populate(
      [
        {
          path: "cartItems",
          model: CartItem,
          populate: {
            path: "product",
            model: Product
          }
        }
      ]
    );

    // if the product already exists as a cart item in the users cart
    if (foundCart.doesProductExist(productId)) {

      // gets the existing cart item and increases the quantity
      const existingCartItem = foundCart.getExistingCartItem(productId);

      existingCartItem.quantity = quantity;
      await existingCartItem.save();

      res.json({
        data: existingCartItem.product,
        status: {
          code: 200,
          message: existingCartItem.product.name + " added to cart"
        }
      });

    // otherwise, a new cart item is created and added to the cart
    } else {
      let foundProduct = await Product.findOne({ 'upc': productId });

      if (foundProduct === null) {
        const elasticSearchManager = new ElasticSearchManager();
        const productData = await elasticSearchManager.getProductIdByUPC(productId);
        console.log('products data from elasticsearch:', productData);

        // foundProduct = await Product.create(productData);
      }

      const newCartItem = await CartItem.create({ 
        product: foundProduct._id,
        quantity: quantity
      });

      foundCart.cartItems.push(newCartItem);
      await foundCart.save();

      res.json({
        data: foundProduct,
        status: {
          code: 201,
          message: foundProduct.name + " added to cart"
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

// Update Route
// this route is where users can update the quantity of a cart item
router.put("/:productId/", loginRequired, async (req, res, next) => {
  const productId = req.params.productId
  const newQuantity = req.body.quantity

  try {
    // finds the users cart
    const foundCart = await Cart.findOne({ 'user': req.session.userId }).populate(
      [{
        path: "cartItems",
        model: CartItem,
        populate: {
          path: "product",
          model: Product
        }
      }]
    )
    console.log('foundCart:', foundCart)

    // finds the cart item that needs to be updated
    const foundCartItem = foundCart.getExistingCartItem(productId)
    console.log('foundCartItem:', foundCartItem)

    foundCartItem.quantity = newQuantity
    await foundCartItem.save()

    res.json({
      data: foundCartItem.product,
      status: {
        code: 200,
        message: "Product quantity successfully increased"
      }
    });
  } catch (error) {
    next(error);
  }
});

// Delete Route
// this route is where cart items are removed from their cart
router.delete("/:productId/", loginRequired, async (req, res, next) => {
  try {
    const foundProduct = await Product.findOne({ 'upc': req.params.productId })

    const deletedCartItem = await CartItem.findOneAndRemove({ 'product': foundProduct._id }).exec()

    res.json({
      data: {},
      status: {
        code: 204,
        mesage: "Product removed form cart"
      }
    })

  } catch (error) {
    next(error)
  }
});

module.exports = router;




