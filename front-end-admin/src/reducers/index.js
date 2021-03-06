import { combineReducers } from "redux";

// Import custom components
import usersReducer from "./users";
import proudctsReducer from "./products";

const rootReducer = combineReducers({
  user: usersReducer,
  data: proudctsReducer
});

export default rootReducer;
