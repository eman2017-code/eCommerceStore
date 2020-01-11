const express = require("express");
const Product = require("../models/product.js");
const User = require("../models/user.js");
const adminRequired = require("../middleware/users/adminRequired.js");

const router = express.Router();

// Create Route
// this route is where the admin can create a new product
router.post("/", adminRequired, async (req, res, next) => {
  const clientData = req.body;

  try {
    const newProduct = await Product.create(clientData);
    newProduct.postedBy = req.session.userId;
    await newProduct.save();

    // if the product has any categories added
    if (clientData.category) {
      // adds the newly created product to the products array in whatever categories where specified
      await newProduct.addProductToCategories(clientData.category);
    }

    res.send({
      data: newProduct,
      status: {
        code: 201,
        message: "Successfully added a new product"
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
