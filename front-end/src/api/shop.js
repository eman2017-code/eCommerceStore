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
        process.env.REACT_APP_API_URL + "/api/v1/users/logout/",
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

  getUsersCart: async (userId) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/carts/' + userId + '/', {
      credentials: 'include'
    })
    const parsedResponse = await response.json()

    console.log('users cart response:', parsedResponse)

    return parsedResponse

  },

  addToUsersCart: async (productId, quantity) => {
    console.log('add to users cart api call')

    const dataToSend = {
      productId: productId,
      quantity: quantity
    }

    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/cart-items/', {
      method: 'POST',
      body: JSON.parse(dataToSend),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const parsedResponse = await response.json()

    return parsedResponse
  }
};









