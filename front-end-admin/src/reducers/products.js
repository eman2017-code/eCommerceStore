import { 
  GET_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  CLEAR_PRODUCTS }
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

    // updates one of the admins products in the store
    case UPDATE_PRODUCT:
      const updatedProduct = action.updatedProduct;
      const indexOfProductToUpdate = state.products.findIndex(product => product.upc = updatedProduct.upc);

      state.products[indexOfProductToUpdate] = updatedProduct;

      return {
        ...state,
        products: state.products
      }

    // removes one of the admins products from the state
    case DELETE_PRODUCT:
      const updatedProducts = state.products.filter(product => product.upc != action.productId);
      
      return {
        ...state,
        products: updatedProducts
      }

    // remove all of the products from the store
    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: []
      }

    default:
      return state;
  }
};

export default productsReducer;
