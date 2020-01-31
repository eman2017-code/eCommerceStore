import { 
  GET_PRODUCTS,
  CREATE_PRODUCT,
  DELETE_PRODUCT }
from "../constants/ActionTypes";

const initialState = {
  products: [],
  symbol: "$"
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {

    // gets all of the admins products
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products
      }

    // adds a product the admin created to their products
    case CREATE_PRODUCT:
      state.products.unshift(action.product);
      return {
        ...state,
        products: state.products
      }

    // removes one of the admins products from the state
    case DELETE_PRODUCT:
      console.log('in DELETE_PRODUCT');
      console.log('before:', state.products);
      const updatedProducts = state.products.filter(product => product.upc != action.productId);
      console.log('after:', updatedProducts);
      

      return {
        ...state,
        products: updatedProducts
      }

    default:
      return state;
  }
};

export default productsReducer;
