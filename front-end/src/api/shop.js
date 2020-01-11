/**
 * Mocking client-server processing
 */
import _products from "./data.json";

const TIMEOUT = 100;

// export default {
//   getProducts: (cb, timeout) =>
//     setTimeout(() => cb(_products), timeout || TIMEOUT),
//   buyProducts: (payload, cb, timeout) =>
//     setTimeout(() => cb(), timeout || TIMEOUT)
// };


export default { 
	getAllProducts: async (callBack) => {
		const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/search/all-products/')
		const parsedResponse = await response.json()
		
		// creates a new array including only information about the product
		const products = parsedResponse.data.map(product => product._source.message)

		return products
	},

	// gets products by category
	getProductsByCategory: async (category) => {
		const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/search/category/' + category + '/')
		const parsedResponse = await response.json()
		console.log('cateogyr products response:', parsedResponse)
		// const products = parsedResponse.data.map(product => product._source.message)
		// return products
	}
}

// // global variable
// let products;

// // make fetch call to elastic index route
// function listAllProducts() {
//   const api = process.env.REACT_APP_API_URL + "/api/v1/search/all-products/";
//   fetch(api)
//     .then(reponse => reponse.json())
//     .then(data => (products = data.data));
//   // .then(data => console.log(data.data));
//   console.log("products");
//   console.log(products);
// }

// listAllProducts();
// console.log("products");
// console.log(products);
