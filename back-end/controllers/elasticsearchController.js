const express = require("express");
const router = express.Router();

// require elasticsearch
const { Client } = require("@elastic/elasticsearch");

// connect to elasticsearch port
const client = new Client({ node: "http://34.68.86.219:9200" });

// handling errors
const { errors } = require("@elastic/elasticsearch");

// index route for products
router.get("/all-products", async (req, res, next) => {
  try {
    const results = await client.search({
      index: "store-products-catalog2-cats",
      body: {
        query: {
          bool: {
            should: [
              {
                match: {
                  "message.category.name.keyword": {
                    // must have this name in the category
                    query: "Cell Phones",
                    // bring this up to the top
                    boost: 5
                  }
                }
              },
              {
                match: {
                  "message.category.name.keyword": {
                    // must have this name in the cateogry
                    query: "Computers & Tablets",
                    // push this towards the front over others
                    boost: 4
                  }
                }
              }
            ]
          }
        }
      }
    });

    // if success
    res.json({
      data: results.body.hits.hits,
      status: {
        code: 200,
        message: "Success loading products"
      }
    });
  } catch (err) {
    next(err);
  }
});

// filters products by whatever category is specified in the query paramaters
router.get("/category/", async (req, res, next) => {
  const categoryName = req.body.categoryName;

  try {
    const results = await client.search({
      index: "store-products-catalog2-cats",
      body: {
        query: {
          bool: {
            filter: {
              term: { "message.category.name.keyword": categoryName }
            }
          }
        }
      }
    });

    res.json({
      data: results,
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
