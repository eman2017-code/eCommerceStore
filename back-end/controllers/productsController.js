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

  // uploads the file to the aws s3 bucket
  const fileUploadManager = new FileUploadManager();
  fileUploadManager.uploadFileToAWS(productImage);

  // gets the url to the image that was just uploaded to the aws s3 bucket
  const awsPathToImage = fileUploadManager.getURLToUploadedFile(productImage.name);

  try {
    const newProduct = await Product.create(productData);
    newProduct.image = awsPathToImage;
    await newProduct.save();

    // if any categories were specified for the products
    if (productData.category) {
      await newProduct.addProductToCategories(clientData.category);
    }

    res.send({
      data: newProduct,
      status: {
        code: 201,
        message: 'Product added successfully'
      }
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;








