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

// Show Route
// this route returns data for a single product
router.get("/:productId/", async (req, res, next) => {
  const clientData = req.body;

  try {
    const foundProduct = await Product.findOne({
      _id: req.params.productId
    }).populate("postedBy", "-password");

    res.json({
      data: foundProduct,
      status: {
        code: 200,
        message: "Successfully found product"
      }
    });
  } catch (error) {
    next(error);
  }
});

// searc route for the products
router.post("/search", async (req, res, next) => {
  try {
    // find the appropriate product
    const foundProduct = await Product.find({
      name: "value",
      function(err, data) {
        if (err) {
          res.send(err);
        } else {
          // res.send(data);
          res.json({
            data: foundProduct,
            status: {
              code: 201,
              message:
                "Successfully found the product that you were looking for"
            }
          });
        }
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
