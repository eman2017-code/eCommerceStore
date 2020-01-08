import { combineReducers } from "redux";

// Reducer to log in the user
const loginUser = person => {
  return {
    person: person
  };
};

// determining when to return the user
const showUserReducer = (shownUser = null, action) => {
  if (action.type === "LOGIN_USER") {
    return action.payload;
  }
  return showUser;
};

// export the function
export default combineReducers({
  users: loginUser,
  showUser: showUserReducer
});
