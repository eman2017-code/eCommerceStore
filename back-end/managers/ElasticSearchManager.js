/*
	This class establishes the connection to elasticsearch and 
	handles all of the elasticsearch queries
*/

const { Client, errors } = require("@elastic/elasticsearch");

class ElasticSearchManager {
  constructor() {
    this.CLIENT_URL = "http://34.68.86.219:9200";
    this.INDEX = "store-products-catalog2-cats";
    this.client = this.connectToClient();
  }

  // establishes connection to elasticsearch
  connectToClient() {
    const client = new Client({ node: this.CLIENT_URL });
    return client;
  }

  // takes an elastic search response as a parameter and returns just the search results
  parseResponse(response) {
    const results = response.body.hits.hits;
    return results;
  }

  // returns all of the products in elasticsearch
  async getAllProducts() {
    const response = await this.client.search({
      index: this.INDEX,
      from: 1,
      size: 1000,
      body: {}
    });
    const products = this.parseResponse(response);
    return products;
  }

  // adds a new product to elasticsearch
  async addNewProduct(productInfo) {
    const response = await this.client.index({
      index: this.INDEX,
      body: {
        owner: productInfo.owner,
        name: productInfo.name,
        description: productInfo.description,
        image: productInfo.image,
        upc: productInfo.upc,
        sku: productInfo.sku,
        price: productInfo.price,
        manufacturer: productInfo.manufacturer,
        model: productInfo.model,
        lastUpdated: productInfo.lastUpdated,
        timestamp: productInfo.timestamp
      }
    });
    return response;
  }

  // updates a product in elasticsearch
  async updateExistingProduct(newProductInfo) {
    // gets the id of the product to update
    const productId = await this.getProductIdByUPC(newProductInfo.upc);

    // sends a request to update the product
    const response = await this.client.update({
      index: this.INDEX,
      id: productId,
      body: { doc: newProductInfo }
    });
    return response;
  }

  // deletes a product from elasticsearch
  async deleteProduct(productId) {
    const response = this.client.deleteByQuery({
      index: this.INDEX,
      body: {
        query: {
          match: {
            "upc": productId
          }
        }
      }  
    })
  }

  // return products based on whatever category is specified in the parameters
  async getProductsByCategory(size, category) {
    const response = await this.client.search({
      index: this.INDEX,
      body: {
        query: {
          multi_match: {
            query: category,
            fields: ["message.category.name^2", "message.name"]
          }
        },
        size: size
      }
    });
    const products = this.parseResponse(response);
    return products;
  }

  // returns products based on the searchTerm in the parameters
  async searchForProducts(size, searchTerm) {
    const results = await this.client.search({
      index: this.INDEX,
      body: {
        query: {
          match_phrase_prefix: {
            "message.name": {
              query: searchTerm,
              slop: 2,
              max_expansions: 10
            }
          }
        },
        size: size
      }
    });
    const products = this.parseResponse(response);
    return products;
  }

  // returns a single product by its id
  async getProductById(productId) {
    const response = await this.client.search({
      index: this.INDEX,
      body: {
        query: {
          term: {
            "message.sku": productId
          }
        },
        size: 1
      }
    });
    const product = this.parseResponse(response);
    return product;
  }

  async getProductByUPC(productUPC) {
    const response = await this.client.search({
      index: this.INDEX,
      body: {
        query: {
          bool: {
            filter: {
              term: {
                "message.upc": productUPC
              }
            }
          }
        }
      }
    });
    return this.parseResponse(response).map(product => product._source.message)[0];
  }

  // queries for a product by its upc value and returns the elasticsearch id of the product
  async getProductIdByUPC(productUPC) {
    const response = await this.client.search({
      index: this.INDEX,
      body: {
        query: {
          bool: {
            filter: {
              term: {
                "message.upc": productUPC
              }
            }
          }
        }
      }
    });
    return this.parseResponse(response)[0]._id;
  }
}

module.exports = ElasticSearchManager;
