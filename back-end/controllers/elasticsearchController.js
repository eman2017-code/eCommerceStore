const express = require("express");
const router = express.Router();
const Product = require('../models/product.js')
const Category = require('../models/category.js')

// require elasticsearch
const { Client } = require("@elastic/elasticsearch");

// connect to elasticsearch port
const client = new Client({ node: "http://34.68.86.219:9200" });

// handling errors
const { errors } = require("@elastic/elasticsearch");

// // index route for products
// router.get("/all-products", async (req, res, next) => {
//   try {
//     const results = await client.search({
//       index: "store-products-catalog2-cats",
//       body: {
//         query: {
//           bool: {
//             should: [
//               {
//                 match: {
//                   "message.category.name.keyword": {
//                     // must have this name in the category
//                     query: "Cell Phones",
//                     // bring this up to the top
//                     boost: 5
//                   }
//                 }
//               },
//               {
//                 match: {
//                   "message.category.name.keyword": {
//                     // must have this name in the cateogry
//                     query: "Computers & Tablets",
//                     // push this towards the front over others
//                     boost: 4
//                   }
//                 }
//               }
//             ]
//           }
//         }
//       }
//     });

//     // if success
//     res.json({
//       data: results.body.hits.hits,
//       status: {
//         code: 200,
//         message: "Success loading products"
//       }
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// load product listing page route -- index route
router.get("/all-products", async (req, res, next) => {
  try {
    const results = await client.search({
      index: "store-products-catalog2-cats",
      from: 1,
      size: 1000,
      body: {}
    });

    // send success if all data is returned
    res.json({
      data: results.body.hits.hits,
      status: {
        code: 200,
        message: "Loaded all products"
      }
    });
  } catch (err) {
    next(err);
  }
});


// this route queries elasticsearch for all the product data and imports the products and 
// categories into mongoDB
router.post('/import/', async (req, res, next) => {
  try {
    const results = await client.search({
      index: "store-products-catalog2-cats",
      from: 1,
      size: 10000,
      body: {}
    }) 

    const products = results.body.hits.hits.map(product => product._source.message)

    // iterate through all the products and creates product instances if they dont already exist
    products.forEach(async (product) => {
      const existingProduct = await Product.findOne({ 'sku': product.sku })

        if (!existingProduct) {

          // iterates through the products categories and creates new category instances if they dont exist
          const productsCategories = product.category.map(async (category) => {
            const existingCategory = await Category.find({ 'name': category.name })

            if (!existingCategory) {
              const newCategory = await Category.create({
                name: category.name
              })
              return newCategory.id
            }
            return existingCategory.id

            const newProduct = await Product.create({
              sku: products.sku,
              name: product.name,
              type: product.type,
              upc: product.upc,
              price: product.price,
              shipping: product.shipping,
              manufacturer: product.manufacturer,
              model: product.model,
              image: product.image,
              description: product.description,
              category: productsCategories
            })
          })
        }
    })

    res.json({
      data: products
    })

  } catch (error) {
    next(error)
  }

})

// filters products by whatever category is specified in the query paramaters
router.get("/category/:categoryName/", async (req, res, next) => {
  const categoryName = req.params.categoryName;

  try {
    const results = await client.search({
      index: "store-products-catalog2-cats",
      body: {
        query: {
          multi_match: {
            query: categoryName,
            fields: ['message.category.name^2', 'message.name'],
          }
        },
        size: 8
      }
    })

    res.json({
      data: results.body.hits.hits,
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
router.get("/products/", async (req, res, next) => {
  const searchTerm = req.body.searchTerm;

  try {
    const results = await client.search({
      index: "store-products-catalog2-cats",
      body: {
        query: {
          match_phrase_prefix: {
            "message.name": {
              query: searchTerm,
              slop: 2,
              max_expansions: 10
            }
          }
        }
      }
    });

    res.json({
      data: results,
      status: {
        code: 200,
        message: "Successfully got products"
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
