import {
  // FETCH_SINGLE_PRODUCT,
  // CLEAR_SINGLE_PRODUCT,
  // CHANGE_CURRENCY,
  // RECEIVE_PRODUCTS,
  // RECEIVE_CATEGORY_PRODUCTS,
  CREATE_PRODUCT
} from "../constants/ActionTypes";

const initialState = {
  products: [],
  symbol: "$"
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case RECEIVE_PRODUCTS:
    //   return { ...state, products: action.products };

    case CREATE_PRODUCT:
      state.products.push(action.product);
      return {
        ...state,
        products: state.products
      };

    default:
      return state;
  }
};

export default productsReducer;
