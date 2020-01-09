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

// // index route
// router.get("/products", function(req, res, next) {
//   productListingPage(req.params.input).then(function(result) {
//     res.json(result);
//   });
// });

// // load product listing page route
// function productListingPage() {
//   return client.indices.putMapping({
//     index: "ecommerce-app",
//     type: "document",
//     body: {
//       properties: {
//         name: { type: "string" },
//         suggest: {
//           type: "completion",
//           analyzer: "simple",
//           search_analyzer: "simple",
//           payloads: true
//         }
//       }
//     }
//   });
// }

// exports.productListingPage = productListingPage;
// console.log((exports.productListingPage = productListingPage));

// // load product listing page route
// async function productListingPage() {
//   try {
//     // calback API
//     client.search(
//       {
//         index: "ecommerce-app",
//         from: 20,
//         size: 10,
//         body: { foo: "ecommerce-app" }
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
//           console.log("results");
//           console.log(result);
//         }
//       }
//     );
//   } catch (err) {
//     next(err);
//   }
// }

// console.log(productListingPage());

// // function to get index all of the products in the data.json file
// async function run() {
//   try {
//     const clientIndex = await client.index({
//       index: "products",
//       body: {
//         products: "products"
//       }
//     });
//     console.log("clientIndex");
//     console.log(clientIndex);
//     console.log("body.hits.hits");
//     console.log(body.hits.hits);
//   } catch (err) {
//     next(err);
//   }
// }

// // this function will mock-run all the elasticsearch queries
// async function run() {
//   // index the products.json file
//   await client.index({
//     index: "products",
//     body: {
//       category: "products"
//     }
//   });
// }

//   // search for category
//   const { body } = await client.search({
//     index: "products",
//     body: {
//       query: {
//         match: { category: "electronics" }
//       }
//     }
//   });

//   // print out results
//   //   console.log(body.hits.hits);
// }

// // this function will mock-run all the elasticsearch queries
// async function run() {
//   // index the products.json file
//   await client.index({
//     index: "products",
//     body: {
//       category: "products"
//     }
//   });

//   // search for category
//   const { body } = await client.search({
//     index: "products",
//     body: {
//       query: {
//         match: { category: "fashion" }
//       }
//     }
//   });

//   // print out results
//   //   console.log(body.hits.hits);
// }

// // this function will mock-run all the elasticsearch queries
// async function run() {
//   // index the products.json file
//   await client.index({
//     index: "products",
//     body: {
//       category: "products"
//     }
//   });

//   // search for category
//   const { body } = await client.search({
//     index: "products",
//     body: {
//       query: {
//         match: { category: "family" }
//       }
//     }
//   });

//   // print out results
//   //   console.log(body.hits.hits);
// }

// // this function will mock-run all the elasticsearch queries
// async function run() {
//   // index the products.json file
//   await client.index({
//     index: "products",
//     body: {
//       category: "products"
//     }
//   });

//   // search for category
//   const { body } = await client.search({
//     index: "products",
//     body: {
//       query: {
//         match: { category: "phones" }
//       }
//     }
//   });

//   // print out results
//   //   console.log(body.hits.hits);
// }

module.exports = router;
