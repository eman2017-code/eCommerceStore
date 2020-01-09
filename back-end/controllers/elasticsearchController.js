const express = require("express");
const router = express.Router();

// require elasticsearch
const { Client } = require("@elastic/elasticsearch");

// connect to elasticsearch port
const client = new Client({ node: "http://35.224.98.206:9200/" });

// handling errors
const { errors } = require("@elastic/elasticsearch");

// load product listing page route -- index route
async function productListingPage() {
  try {
    // calback API
    client.search(
      {
        index: "store-products-catalog2-cats",
        body: {}
      },
      {
        ignore: [404],
        maxRetries: 3
      },
      (err, result) => {
        if (err) {
          console.log("err");
          console.log(err);
        } else {
          console.log(" --- RESULTS IN PRODUCT_LISTING_PAGE FUNCTION --- ");
          console.log(result.body.hits.hits);
        }
      }
    );
  } catch (err) {
    next(err);
  }
}

// print this out to see the results of this query from elasticsearch
// console.log("productListingPage function output");
// productListingPage();



router.get('/category/:categoryName/', async (req, res, next) => {
  const categoryName = req.params.categoryName

  try {
    const results = await client.search({
      index: 'store-products-catalog2-cats',
      body: {
        query: {
          bool: {
            filter: {
              term: { 'message.category.name': categoryName }
            }
          }
        }
      }
    })
    console.log(results)

    res.json({
      data: results
    }) 
  } catch (error) {
    next(error)
  }
})



module.exports = router;
