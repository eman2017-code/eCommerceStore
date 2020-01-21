const express = require("express");
const Product = require("../models/product.js");
const User = require("../models/user.js");
const adminRequired = require("../middleware/users/adminRequired.js");
const fileUpload = require('../middleware/fileUpload.js');
const FileUploadManager = require('../managers/FileUploadManager.js');
const fs = require('fs');


const router = express.Router();


// Index Route
// returns all of the products the database
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.find({})

    res.json({
      data: allProducts,
      status: {
        code: 200,
        message: 'Successfully got all products'
      }
    })
  } catch (error) {
    next(error)
  }
})

// Create Route
// this route is where the admin can create a new product
router.post("/", async (req, res, next) => {
  const productData = req.body;
  const productImage = req.files.image;

  const fileUploadManager = new FileUploadManager();
  fileUploadManager.uploadFileToAWS(productImage);

  res.send({
    data: 'response'
  })

  // try {
  //   const newProduct = await Product.create(clientData);
  //   newProduct.postedBy = req.session.userId;
  //   await newProduct.save();

  //   // if the product has any categories added
  //   if (clientData.category) {
  //     // adds the newly created product to the products array in whatever categories where specified
  //     await newProduct.addProductToCategories(clientData.category);
  //   }

  //   res.send({
  //     data: newProduct,
  //     status: {
  //       code: 201,
  //       message: "Successfully added a new product"
  //     }
  //   });
  // } catch (error) {
  //   next(error);
  // }
});

module.exports = router;








