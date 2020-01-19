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

}


const elasticSearch = new ElasticSearchManager()
