const express = require("express");
const router = express.Router();

// require elasticsearch
const { Client } = require("@elastic/elasticsearch");

// connect to elasticsearch port
const client = new Client({ node: "http://35.224.98.206:9200/" });
// console.log(client);

// handling errors
const { errors } = require("@elastic/elasticsearch");
// console.log(errors);

// load product listing page route -- index route
async function productListingPage() {
  try {
    // calback API
    client.search(
      {
        index: "product_catalog",
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
console.log("productListingPage function output");
productListingPage();

module.exports = router;
