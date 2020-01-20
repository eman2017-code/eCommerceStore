const ElasticSearchManager = require('../managers/ElasticSearchManager.js')


class RemoteImageChecker {

    constructor() {
        console.log('in constructor')

        this.elasticSearchManager = new ElasticSearchManager();
        this.products = this.getProductsToCheck();
    }

    async getProductsToCheck() {
        console.log('getProductsToCheck method called')

        const products = await this.elasticSearchManager.getAllProducts(1000);
        console.log('get products to check:', products);
        
        return products;
    }

    start() {
        console.log('start method called')
    }
}

module.exports = RemoteImageChecker
