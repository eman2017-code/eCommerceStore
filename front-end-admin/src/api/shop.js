export default {
  // makes call to the api to register a new user
  registerUser: async (registrationInfo, next) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/register/",
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
  loginUser: async loginInfo => {
    try {
      const response = await fetch(
        // "http://35.222.68.3:5000//api/v1/users/login/",
        "http://localhost:8000/api/v1/users/login/",
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
    } catch (error) {}
  }
};
