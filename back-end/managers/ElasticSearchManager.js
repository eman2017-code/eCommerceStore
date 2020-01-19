const { Client, errors } = require("@elastic/elasticsearch")


class ElasticSearchManager {

	constructor() {
		this.CLIENT_URL = 'http://34.68.86.219:9200'
		this.INDEX = 'store-products-catalog2-cats'
		this.client = this.connectToClient()
	}

	// establishes connection to elasticsearch
	connectToClient() {
		const client = new Client({ node: this.CLIENT_URL })
		return client
	}

	// takes an elastic search response and returns just the search results
	parseResponse(response) {
		const results = response.body.hits.hits
		return results
	}

	// returns all of the products in elasticsearch
	async getAllProducts(size) {
		const response = await this.client.search({
	    	index: this.INDEX,
	        from: 1,
	        size: size,
	        body: {}
    	})
    	const products = this.parseResponse(response)
    	return products
	}




}


const elasticSearch = new ElasticSearchManager()

getProducts = async () => {
	const products = await elasticSearch.getAllProducts(10)
	console.log('results:', products)
}

getProducts()



