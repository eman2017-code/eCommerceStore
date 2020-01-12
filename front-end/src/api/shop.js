/**
 * Mocking client-server processing
 */
import _products from "./data.json";


export default {

  // calls the api and attempts to login the user
  loginUser: async (loginInfo, next) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "/api/v1/users/login/", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const parsedResponse = await response.json()
      return parsedResponse

    } catch (error) {
      next(error)
    }
  },

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
  },

  getUsersCart: async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/')
  }

};
