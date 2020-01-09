import { combineReducers } from "redux";
import { IntlReducer as Intl, IntlProvider } from "react-redux-multilingual";

// Import custom components
import productReducer from "./products";
import cartReducer from "./cart";
import filtersReducer from "./filters";
// import compareReducer from "./compare";

const rootReducer = combineReducers({
  data: productReducer,
  cartList: cartReducer,
  filters: filtersReducer,
  Intl
});

export default rootReducer;
