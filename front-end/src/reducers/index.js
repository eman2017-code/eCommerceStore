import { combineReducers } from "redux";
import { IntlReducer as Intl } from "react-redux-multilingual";

// Import custom components
import usersReducer from './users';
import productReducer from "./products";
import cartReducer from "./cart";
import filtersReducer from "./filters";

const rootReducer = combineReducers({
  user: usersReducer,
  data: productReducer,
  cartList: cartReducer,
  filters: filtersReducer,
  Intl
});

export default rootReducer;
