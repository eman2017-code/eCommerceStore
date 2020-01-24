const express = require("express");
const Product = require("../models/product.js");
const User = require("../models/user.js");
const adminRequired = require("../middleware/users/adminRequired.js");
const loginRequired = require("../middleware/users/loginRequired.js");
const fileUpload = require("../middleware/fileUpload.js");
const FileUploadManager = require("../managers/FileUploadManager.js");
const ElasticSearchManager = require("../managers/ElasticSearchManager.js");
const router = express.Router();

// Index Route
// returns all of the products the database
router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Product.find({}).sort("-timestamp");
    res.json({
      data: allProducts,
      status: {
        code: 200,
        message: "Successfully got all products"
      }
    });
  } catch (error) {
    next(error);
  }
});

// ------- THIS IS THE ROUTE THAT SHOWS ALL THE PRODUCTS THAT AN ADNIN HAS CREATED ------- //

// this route lists all of the products that the admin specifically has created
router.get("/productsByAdmin", loginRequired, async (req, res, next) => {
  try {
    // array to list all of the products that the admin has created
    // find the user
    const foundUser = await User.findOne({ _id: req.session.userId });
    console.log("foundUser._id:", foundUser._id);
    // find all the products that belong to the admin
    const productsByAdmin = await Product.find({
      owners: { $in: foundUser._id }
    });
    console.log("foundProducts:", foundProducts);
    res.json({
      data: productsByAdmin,
      status: {
        code: 200,
        message: "Successfully loaded all products you have created"
      }
    });
  } catch (err) {
    next(err);
  }
});

// Create Route
// this route is where the admin can create a new product
router.post("/", adminRequired, async (req, res, next) => {
  const productData = req.body;
  productData.owner = req.session.userId;
  const productImage = req.files.image;

  const fileUploadManager = new FileUploadManager();
  productImage.name = await fileUploadManager.validateFileNameIsUnique(productImage.name);

  // gets the url to the image that was just uploaded to the aws s3 bucket
  const awsPathToImage = fileUploadManager.getURLToUploadedFile(productImage.name);
  productData.image = awsPathToImage;

  try {
    // create the new product in mongoose
    const newProduct = await Product.create(productData);
    await newProduct.addCategories(productData);
    await newProduct.save();

    // adds the new product to elasticsearch
    const elasticSearchManager = new ElasticSearchManager();
    const elasticSearchResponse = await elasticSearchManager.addNewProduct(newProduct);

    // if theres was an error adding the product to elasticsearch
    if (elasticSearchResponse.statusCode !== 201) {
      const deletedProduct = await Product.findByIdAndRemove(newProduct.id).exec();

      res.send({
        data: {},
        status: {
          code: 400,
          message: "Error connecting to Elasticsearch"
        }
      });

      // otherwise if the product was successfully uploaded to elasticsearch
    } else {
      fileUploadManager.uploadFileToAWS(productImage, res);

      res.send({
        data: newProduct,
        status: {
          code: 201,
          message: "Product added successfully"
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

// Update Route
// this route is where the admin can update an existing product
router.put("/:productId/", adminRequired, async (req, res, next) => {
  const productId = req.params.productId;
  const productData = req.body;
  productData.owner = req.session.userId;
  const productImage = req.files.image;

  try {
    // updates the product in mongo
    const foundProduct = await Product.findOne({ upc: productId });
    await foundProduct.updateFields(productData);
    await foundProduct.addCategories(productData);

    const fileUploadManager = new FileUploadManager();

    // validates the new images name is unique, then updates the image in aws
    const existingImageName = foundProduct.getImageName();
    if (existingImageName !== productImage.name) {
      productImage.name = await fileUploadManager.validateFileNameIsUnique(productImage.name);
    }
    fileUploadManager.updateFileInAWS(existingImageName, productImage, res);

    // gets the path the updated product image in aws and store it in the product image field
    const awsPathToImage = fileUploadManager.getURLToUploadedFile(
      productImage.name
    );
      
    foundProduct.image = awsPathToImage;
    await foundProduct.save();

    // updates the product in elasticsearch
    const elasticSearchManager = new ElasticSearchManager();
    productData.image = awsPathToImage;
    const elasticSearchResponse = await elasticSearchManager.updateExistingProduct(
      productData
    );

    res.json({
      data: foundProduct,
      status: {
        code: 200,
        message: "Successfully updated the product."
      }
    });
  } catch (error) {
    next(error);
  }
});

// DELETE ROUTE
// this route is where the admin can delete a product
router.delete("/:productId/", adminRequired, async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const foundProduct = await Product.findOne({ upc: productId });

    // gets the images name so it can be removed from aws
    const imageName = foundProduct.getImageName();

    // deletes product from mongo
    foundProduct.remove();

    // deletes the image from aws
    const fileUploadManager = new FileUploadManager();
    fileUploadManager.deleteFileFromAWS(imageName, res);

    // deletes the product from elasticsearch
    const elasticSearchManager = new ElasticSearchManager();
    const elasticSearchResponse = elasticSearchManager.deleteProduct(productId);

    res.json({
      data: {},
      status: {
        code: 204,
        message: "Product successfully deleted"
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
