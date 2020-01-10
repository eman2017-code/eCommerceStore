/**
 * Mocking client-server processing
 */
import _products from "./data.json";

const TIMEOUT = 100;

export default {
  getProducts: (cb, timeout) =>
    setTimeout(() => cb(_products), timeout || TIMEOUT),
  buyProducts: (payload, cb, timeout) =>
    setTimeout(() => cb(), timeout || TIMEOUT)
};

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
