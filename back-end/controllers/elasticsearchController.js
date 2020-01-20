const express = require("express");
const router = express.Router();
const ElasticSearchManager = require("../managers/ElasticSearchManager.js");

// instantiation of this class establishes the connection to elasticsearch
// and now it can perform elasticsearch queries
const elasticSearchManager = new ElasticSearchManager();

// Index Route
// returns all of the products
router.get("/all-products", async (req, res, next) => {
  try {
    // queries for all the products
    const results = await elasticSearchManager.getAllProducts(10);

    // send success if all data is returned
    res.json({
      data: results,
      status: {
        code: 200,
        message: "Successfully got all of the products"
      }
    });
  } catch (err) {
    next(err);
  }
});

// filters products by whatever category is specified in the query paramaters
router.get("/category/:categoryName/", async (req, res, next) => {
  const category = req.params.categoryName;

  try {
    // queries for products by category
    const products = await elasticSearchManager.getProductsByCategory(
      8,
      category
    );

    res.json({
      data: products,
      status: {
        code: 200,
        message: "Succesfully got products"
      }
    });
  } catch (error) {
    next(error);
  }
});

// searches for products
router.post("/products/", async (req, res, next) => {
  const searchTerm = req.body.searchTerm;

  try {
    // queries products by a search term
    const products = await elasticSearchManager.searchForProducts(searchTerm);

    res.json({
      data: products,
      status: {
        code: 200,
        message: "Successfully got products"
      }
    });
  } catch (error) {
    next(error);
  }
});

// get specific product id route
router.get("/product/:sku/", async (req, res, next) => {
  productId = req.params.sku;

  try {
    // queries for a single product by its id
    const product = await elasticSearchManager.getProductById(productId);

    res.json({
      data: product,
      status: {
        code: 200,
        message: "Succesfully got products"
      }
    });
  } catch (err) {
    next(err);
  }
});

// // this route queries elasticsearch for all the product data and imports the products and
// // categories into mongoDB
// router.post("/import/", async (req, res, next) => {
//   try {
//     const results = await client.search({
//       index: "store-products-catalog2-cats",
//       from: 1,
//       size: 10000,
//       body: {}
//     });

//     const products = results.body.hits.hits.map(
//       product => product._source.message
//     );

//     // iterate through all the products and creates product instances if they dont already exist
//     products.forEach(async product => {
//       const existingProduct = await Product.findOne({ sku: product.sku });

//       if (!existingProduct) {
//         // iterates through the products categories and creates new category instances if they dont exist
//         const productsCategories = product.category.map(async category => {
//           const existingCategory = await Category.find({ name: category.name });

//           if (!existingCategory) {
//             const newCategory = await Category.create({
//               name: category.name
//             });
//             return newCategory.id;
//           }
//           return existingCategory.id;

//           const newProduct = await Product.create({
//             sku: products.sku,
//             name: product.name,
//             type: product.type,
//             upc: product.upc,
//             price: product.price,
//             shipping: product.shipping,
//             manufacturer: product.manufacturer,
//             model: product.model,
//             image: product.image,
//             description: product.description,
//             category: productsCategories
//           });
//         });
//       }
//     });

//     res.json({
//       data: products
//     });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
