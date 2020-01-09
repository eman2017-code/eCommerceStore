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
// console.log("productListingPage function output");
// productListingPage();

// filter route for 'mens' category ( this is how it will be for each filter result ['Electronics', 'Watches', 'Family', 'Fashion'] )
// async function productFilterMenCategory() {
// try {
//   // callback API
//   client.search(
//     {
//       index: "product_catalog",
//       body: {
//         query: {
//           match: {
//             "category": "men"
//           }
//         }
//       }
//     },
//     {
//       ignore: [404],
//       maxRetries: 3
//     },
//     (err, result) => {
//       if (err) {
//         console.log("err");
//         console.log(err);
//       } else {
//         console.log(
//           " --- RESULTS IN PRODUCT_FILTER_MEN_CATEGORY FUNCTION --- "
//         );
//         console.log(result.body.hits.hits);
//       }
//     }
//   );
// } catch (err) {
//   next(err);
// }
//   try {
//     // callback api
//     client.search({
//       index: "product_catalog",
//       body: {
//         query: {
//           match: {
//             category: "men"
//           }
//         }
//       },
//       function(err, res, status) {
//         if (err) {
//           console.log("search error: " + err);
//         } else {
//           console.log("--- Response ---");
//           console.log(res);
//           console.log("--- Hits ---");
//           res.hits.hits.forEach(function(hit) {
//             console.log(hit);
//           });
//         }
//       }
//     });
//   } catch (err) {
//     next(err);
//   }
// }
// console.log("productFilterMenCategory function output");
// productFilterMenCategory();

module.exports = router;
