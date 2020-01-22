const express = require("express");
const Product = require("../models/product.js");
const User = require("../models/user.js");
const adminRequired = require("../middleware/users/adminRequired.js");
const fileUpload = require('../middleware/fileUpload.js');
const FileUploadManager = require('../managers/FileUploadManager.js');
const ElasticSearchManager = require('../managers/ElasticSearchManager.js');
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
router.post("/", adminRequired, async (req, res, next) => {
  const productData = req.body;
  const productImage = req.files.image;

  // establishes the connection to the aws s3 bucket
  const fileUploadManager = new FileUploadManager();

  // gets the url to the image that was just uploaded to the aws s3 bucket
  const awsPathToImage = fileUploadManager.getURLToUploadedFile(productImage.name);
  productData.image = awsPathToImage;

  try {
    const newProduct = await Product.create(productData);

    // if any categories were specified for the products
    if (productData.category) {
      await newProduct.addProductToCategories(clientData.category);
      await newProduct.save();
    }

    // adds the new product to elasticsearch
    const elasticSearchManager = new ElasticSearchManager();
    const elasticSearchResponse = await elasticSearchManager.addNewProduct(newProduct);
    
    // if theres was an error adding the product to elasticsearch
    if (elasticSearchResponse.statusCode !== 201) {

      // product in mongo gets deleted since it couldnt be uploaded to elasticsearch
      const deletedProduct = await Product.findByIdAndRemove(newProduct.id).exec();
    
      res.send({
        data: {},
        status: {
          code: 400,
          message: 'Error connecting to Elasticsearch'
        }
      })

    // otherwise if the product was successfully uploaded to elasticsearch
    } else {
      
      // uploads the image to the aws s3 bucket
      fileUploadManager.uploadFileToAWS(productImage, res);

      res.send({
        data: newProduct,
        status: {
          code: 201,
          message: 'Product added successfully'
        }
      });
    }

  } catch (error) {
    next(error);
  }
});


// Update Route
// this route is where the admin can update an existing product
router.put('/:productId/', adminRequired, async (req, res, next) => {
  const productId = req.params.productId;
  const productData = req.body;
  const productImage = req.files;

  // establishes the connection to the aws s3 bucket
  const fileUploadManager = new FileUploadManager();
  
  try {
    const updatedProduct = await Product.updateOne({ 'upc': productId }, productData);

    if (productImage) {
      console.log('new products image sent');
    }

    res.json({
      data: updatedProduct,
      status: {
        code: 200,
        message: 'Successfully updated the product.'
      }
    })
  } catch (error) {

  }
});

module.exports = router;








