import { CREATE_PRODUCT } from "../constants/ActionTypes";

const initialState = {
  products: [],
  symbol: "$"
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
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
