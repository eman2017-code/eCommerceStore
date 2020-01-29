// this code allows us to easily change between production api url and
// the development api url, by changing debug to true or false
const debug = true;
let apiURL;
if (debug) {
  apiURL = "http://localhost:8000/api/v1/";
} else {
  apiURL = "http://35.222.68.3:8000/api/v1/";
}

console.log("the api url is:", apiURL);

export default {
  // makes call to the api to register a new user
  registerUser: async registrationInfo => {
    console.log("the api url is:", apiURL);
    try {
      const response = await fetch(
        apiURL + "users/register/",
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
      console.log("response:", parsedResponse);
      return parsedResponse;
    } catch (error) {}
  },

  // makes call to the api to attempt to login the user
  loginUser: async loginInfo => {
    console.log("the api url is:", apiURL);
    try {
      const response = await fetch(
        apiURL + "users/login/",
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
    } catch (error) {}
  },

  // makes call to teh api to logout the user
  logoutUser: async () => {
    try {
      const response = await fetch(
        apiURL + "users/logout/",
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
    } catch (error) {}
  },

  getAllProducts: async callBack => {
    const response = await fetch(
      apiURL + "search/all-products/"
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
      apiURL + "search/category/" + category + "/"
      // "http://localhost:8000/api/v1/search/category/" + category + "/"
    );
    const parsedResponse = await response.json();
    const products = parsedResponse.data.map(
      product => product._source.message
    );
    return products;
  },

  getUsersCart: async userId => {
    const response = await fetch(
      apiURL + "carts/" + userId + "/",
      {
        credentials: "include"
      }
    );
    const parsedResponse = await response.json();
    return parsedResponse;
  },

  // adds a product to a logged in users cart
  addToUsersCart: async (productId, quantity) => {
    const dataToSend = {
      productId: productId,
      quantity: quantity
    };

    const response = await fetch(
      apiURL + "cart-items/",
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
      apiURL + "cart-items/" + productId + "/",
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
      apiURL + "cart-items/" + product.upc + "/",
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
    console.log("response from updating quantity:", parsedResponse);
  },

  // makes a fetch call to search for a product via elasticsearch
  fetchSingleProductFromElastic: async productId => {
    const response = await fetch(
      apiURL + "search/product/" + productId + "/"
    );
    const parsedResponse = await response.json();

    // maps the response to get just the needed products information
    const foundProduct = parsedResponse.data.map(
      product => product._source.message
    )[0];

    return foundProduct;
  },

  // makes fetch call to checkout a guest user or logged in user
  checkout: async (products, isLoggedIn, userInfo) => {
    const dataToSend = {
      userInfo: userInfo
    };

    const productsToSend = [];
    if (!isLoggedIn) {
      products.forEach(product => {
        for (let i = 0; i < product.qty; i++) {
          productsToSend.push(product);
        }
      });
      console.log("products sent in fetch:", productsToSend);

      dataToSend.products = productsToSend;
    }

    const response = await fetch(apiURL + "checkout/", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ data: dataToSend }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const parsedResponse = await response.json();
    return parsedResponse;
  }
};
