// api call to register user
export default {
  registerUser: async (registrationInfo, next) => {
    try {
      const response = await fetch(
        // api endpoint
        "http://35.222.68.3:5000/api/v1/users/register/",
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
  }
};
