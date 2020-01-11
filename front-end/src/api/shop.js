/**
 * Mocking client-server processing
 */
import _products from "./data.json";

// const TIMEOUT = 100;

// export default {
//   getProducts: (cb, timeout) =>
//     setTimeout(() => cb(_products), timeout || TIMEOUT),
//   buyProducts: (payload, cb, timeout) =>
//     setTimeout(() => cb(), timeout || TIMEOUT)
// };

export default {
  getAllProducts: async callBack => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/api/v1/search/all-products/"
    );
    const parsedResponse = await response.json();

    // creates a new array including only information about the product
    const products = parsedResponse.data.map(
      product => product._source.message
    );

    return products;
  },

  // gets products by category
  getProductsByCategory: async category => {
    const response = await fetch(
      process.env.REACT_APP_API_URL +
        "/api/v1/search/category/" +
        category +
        "/"
    );
    const parsedResponse = await response.json();
    const products = parsedResponse.data.map(
      product => product._source.message
    );
    return products;
  }
};
