const express = require("express");
const router = express.Router();

// require elasticsearch
const { Client } = require("@elastic/elasticsearch");
// connect to elasticsearch port
const client = new Client({ node: "http://localhost:9200" });

// this function will mock-run all the elasticsearch queries
async function run() {
  // index the products.json file
  await client.index({
    index: "products",
    body: {
      category: "products"
    }
  });

  // search for category
  const { body } = await client.search({
    index: "products",
    body: {
      query: {
        match: { category: "electronics" }
      }
    }
  });

  // print out results
  //   console.log(body.hits.hits);
}

// this function will mock-run all the elasticsearch queries
async function run() {
  // index the products.json file
  await client.index({
    index: "products",
    body: {
      category: "products"
    }
  });

  // search for category
  const { body } = await client.search({
    index: "products",
    body: {
      query: {
        match: { category: "fashion" }
      }
    }
  });

  // print out results
  //   console.log(body.hits.hits);
}

// this function will mock-run all the elasticsearch queries
async function run() {
  // index the products.json file
  await client.index({
    index: "products",
    body: {
      category: "products"
    }
  });

  // search for category
  const { body } = await client.search({
    index: "products",
    body: {
      query: {
        match: { category: "family" }
      }
    }
  });

  // print out results
  //   console.log(body.hits.hits);
}

// this function will mock-run all the elasticsearch queries
async function run() {
  // index the products.json file
  await client.index({
    index: "products",
    body: {
      category: "products"
    }
  });

  // search for category
  const { body } = await client.search({
    index: "products",
    body: {
      query: {
        match: { category: "phones" }
      }
    }
  });

  // print out results
  //   console.log(body.hits.hits);
}

// run().catch(console.log);

module.exports = router;
