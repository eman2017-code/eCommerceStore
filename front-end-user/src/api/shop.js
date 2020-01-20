/**
 * Mocking client-server processing
 */
// import _products from "./data.json";

export default {
  // makes call to the api to register a new user
  registerUser: async (registrationInfo, next) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/v1/users/register/",
        {
          method: "POST",
          body: JSON.stringify(registrationInfo),
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {
      next(error);
    }
  },

  // makes call to the api to attempt to login the user
  loginUser: async (loginInfo, next) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/v1/users/login/",
        {
          method: "POST",
          body: JSON.stringify(loginInfo),
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {
      next(error);
    }
  },

  // makes call to teh api to logout the user
  logoutUser: async next => {
    try {
      const response = await fetch(
        "http://35.222.68.3:8000/api/v1/users/logout/",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {
      next(error);
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
    // in the products.json, any two words that are joined together to make one object
    // in the [category] are joined with ---> & <---. No words are joined with "and",
    // this will return skewed results

    if (category == "computers and tablets") {
      category = "Computers & Tablets";
    }

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

  getUsersCart: async userId => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/api/v1/carts/" + userId + "/",
      {
        credentials: "include"
      }
    );
    const parsedResponse = await response.json();

    console.log("users cart response:", parsedResponse);

    return parsedResponse;
  },

  // adds a product to a logged in users cart
  addToUsersCart: async (productId, quantity) => {
    const dataToSend = {
      productId: productId,
      quantity: quantity
    };

    const response = await fetch(
      process.env.REACT_APP_API_URL + "/api/v1/cart-items/",
      {
        method: "POST",
        body: JSON.stringify(dataToSend),
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const parsedResponse = await response.json();

    return parsedResponse;
  },

  // removes a product from a logged in users cart
  removeFromUsersCart: async productId => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/api/v1/cart-items/" + productId + "/",
      {
        method: "DELETE",
        credentials: "include"
      }
    );
    const parsedResponse = await response.json();

    return parsedResponse;
  },

  // updates the quantity of a users cart item
  updateProductQuantity: async product => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/api/v1/cart-items/" + product.upc + "/",
      {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({ quantity: product.qty }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const parsedResponse = await response.json();
  },

  // makes a fetch call to search for a product via elasticsearch
  fetchSingleProductFromElastic: async productId => {
    const response = await fetch(
      process.env.REACT_APP_API_URL +
        "/api/v1/search/product/" +
        productId +
        "/"
    );
    const parsedResponse = await response.json();

    // maps the response to get just the needed products information
    const foundProduct = parsedResponse.data.map(
      product => product._source.message
    )[0];

    return foundProduct;
  }
};
