import {
  RECEIVE_PRODUCTS
} from "../constants/ActionTypes";

const initialState = {
  products: [],
  symbol: "$"
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
};

export default productsReducer;
