import { combineReducers } from "redux";

// Import custom components
import usersReducer from "./users";

const rootReducer = combineReducers({
  user: usersReducer
});

export default rootReducer;
