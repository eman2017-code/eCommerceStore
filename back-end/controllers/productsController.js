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
    await newProduct.addCategories(productData);

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

  try {
    const foundProduct = await Product.findOne({ 'upc': productId });
    await foundProduct.updateFields(productData);

    // updates the products categories
    await foundProduct.addCategories(productData);

    // establishes the connection to the aws s3 bucket
    const fileUploadManager = new FileUploadManager();

    // the image field contains the url to the image, and aws just needs the images name
    // so this calls a function to parse the images url to get just the name
    const existingImageName = foundProduct.getImageName();

    // updates the products image in aws - deletes existing, uploads new 
    fileUploadManager.updateFileInAWS(existingImageName, productImage.image);

    // gets the path the updated product image in aws and store it in the product image field
    const awsPathToImage = fileUploadManager.getURLToUploadedFile(productImage.image.name);
    foundProduct.image = awsPathToImage;
    await foundProduct.save()

    // establishes connection to elasticsearch
    const elasticSearchManager = new ElasticSearchManager();

    // adds the the path of the new image to the productData object and updates it in elasticsearch
    productData.image = awsPathToImage;
    const elasticSearchResponse = await elasticSearchManager.updateExistingProduct(productData);

    res.json({
      data: foundProduct,
      status: {
        code: 200,
        message: 'Successfully updated the product.'
      }
    })
  } catch (error) {
    next(error);
  }
});

module.exports = router;








