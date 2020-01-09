const express = require("express");
const router = express.Router();

// require elasticsearch
const { Client } = require("@elastic/elasticsearch");
// connect to elasticsearch port
const client = new Client({ node: "http://localhost:9200" });

// this function will mock-run all the elasticsearch queries

module.exports = router;
