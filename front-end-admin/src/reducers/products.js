import { LIST_PRODUCTS_ADMIN } from "../constants/ActionTypes";

const initialState = {
  adminProducts: [],
  symbol: "$"
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_PRODUCTS_ADMIN:
      return {
        ...state,
        adminProducts: action.products
      };
    default:
      return state;
  }
};

export default productsReducer;
