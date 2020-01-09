const express = require("express");
const router = express.Router();

// require elasticsearch
const { Client } = require("@elastic/elasticsearch");

// connect to elasticsearch port
const client = new Client({ node: "http://35.224.98.206:9200/" });

// handling errors
const { errors } = require("@elastic/elasticsearch");

// // load product listing page route -- index route
// async function productListingPage() {
//   try {
//     // calback API
//     client.search(
//       {
//         index: "store-products-catalog2-cats",
//         body: {}
//       },
//       {
//         ignore: [404],
//         maxRetries: 3
//       },
//       (err, result) => {
//         if (err) {
//           console.log("err");
//           console.log(err);
//         } else {
//           console.log(" --- RESULTS IN PRODUCT_LISTING_PAGE FUNCTION --- ");
//           console.log(result.body.hits.hits);
//         }
//       }
//     );
//   } catch (err) {
//     next(err);
//   }
// }

// load product listing page route -- index route
router.get("/all-products", async (req, res, next) => {
  try {
    const results = await client.search({
      index: "store-products-catalog2-cats",
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

// filters products by whatever category is specified in the query paramaters
router.get("/category/:categoryName/", async (req, res, next) => {
  const categoryName = req.params.categoryName;
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

module.exports = router;
