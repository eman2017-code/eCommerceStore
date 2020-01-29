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
    try {
      const response = await fetch(apiURL + "users/admin/register/", {
        method: "POST",
        body: JSON.stringify(registrationInfo),
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const parsedResponse = await response.json();
      console.log("parsedResponse:", parsedResponse);
      return parsedResponse;
    } catch (error) {}
  },

  // makes call to the api to attempt to login the user
  loginUser: async loginInfo => {
    try {
      const response = await fetch(apiURL + "users/admin/login/", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {}
  },

  // makes call to the api to logout the user
  logoutUser: async () => {
    try {
      const response = await fetch(apiURL + "users/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {}
  },

  getAllProducts: async callBack => {
    const response = await fetch(apiURL + "products/admin/");

    const parsedResponse = await response.json();
    console.log("parsedResponse:", parsedResponse);

    const products = parsedResponse.data;

    return products;
  }
};
