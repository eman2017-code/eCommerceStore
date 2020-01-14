import shop from "../api/shop";
import * as types from "../constants/ActionTypes";
// import store from "../store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const clearCart = () => async dispatch => {
  dispatch({
    type: 'CLEAR_CART'
  })
}

// registers a new user
export const registerUser = registrationInfo => async dispatch => {

  // makes the api call to register
  const registrationResponse = await shop.registerUser(registrationInfo);
  const userInfo = registrationResponse.data;

  if (registrationResponse.status.code === 201) {

    // gets the user cart
    const getUsersCartResponse = await shop.getUsersCart(userInfo._id);
    const usersCart = getUsersCartResponse.data;

    // sets the users cart in the store
    dispatch({
      type: types.SET_USERS_CART,
      cart: usersCart
    });
    dispatch({
      type: types.LOGIN,
      userInfo: userInfo
    });
    toast.success(registrationResponse.status.message);
  } else {
    toast.error(registrationResponse.status.message);
  }
};


// attempts to log in a user
export const loginUser = loginInfo => async dispatch => {

  // makes the api call to login
  const loginResponse = await shop.loginUser(loginInfo);
  const userInfo = loginResponse.data;

  // if the user successfully logged in
  if (loginResponse.status.code === 200) {

    // gets the user cart
    const getUsersCartResponse = await shop.getUsersCart(userInfo._id);
    const usersCart = getUsersCartResponse.data;

    // sets the users cart in the store
    dispatch({
      type: types.SET_USERS_CART,
      cart: usersCart
    });
    dispatch({
      type: types.LOGIN,
      userInfo: userInfo
    });
    toast.success(loginResponse.status.message);
  } else {
    toast.error(loginResponse.status.message);
  }
};


// logs out a user
export const logoutUser = () => async dispatch => {

  // makes the api call to logout
  const logoutResponse = await shop.logoutUser();

  // removes the users cart from the state
  dispatch({
    type: types.REMOVE_USERS_CART
  });

  // removes logged in user from the state
  dispatch({
    type: types.LOGOUT
  });

  toast.success(logoutResponse.status.message);
};


export const fetchProductsBegin = () => ({
  type: types.FETCH_PRODUCTS_BEGIN
});


export const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products: products
});


export const receiveCategoryProducts = (products, category) => ({
  type: types.RECEIVE_CATEGORY_PRODUCTS,
  products: products,
  category: category
});


export const getAllProducts = () => async dispatch => {
  dispatch(fetchProductsBegin());
  const products = await shop.getAllProducts();
  dispatch(receiveProducts(products));
  return products;
};


// gets products by category specified in the parameter
export const getProductsByCategory = category => async dispatch => {
  dispatch(fetchProductsBegin());
  const products = await shop.getProductsByCategory(category);
  dispatch(receiveCategoryProducts(products, category));
};


// get individual product
export const fetchSingleProduct = productId => ({
  type: types.FETCH_SINGLE_PRODUCT,
  productId
});

// makes a fetch call to find a single product in elasticsearch
export const fetchSingleProductFromElastic = productId => async dispatch => {

  // calling this reducer clears the product that is already in the state,
  // this is being done because if a product is already in the state, it will appear 
  // on the show product page for half a second, then it switches to the product that was
  // returned in the fetch call.
  dispatch({
    type: types.CLEAR_SINGLE_PRODUCT
  })

  const foundProduct = await shop.fetchSingleProductFromElastic(productId)

  // sets the found product in the store 
  dispatch({
    type: types.FETCH_SINGLE_PRODUCT,
    product: foundProduct
  })
}


//it seems that I should probably use this as the basis for "Cart"
export const addToCart = (product, qty) => dispatch => {
  dispatch(addToCartUnsafe(product, qty));
  toast.success("Item added to cart");
};


// action for when logged in users add a product to their cart
export const addToUsersCart = (product, quantity) => async dispatch => {
  const productId = product.upc;
  const addToCartResponse = await shop.addToUsersCart(productId, quantity);
  dispatch({
    type: types.ADD_TO_USERS_CART,
    product: product,
    quantity: quantity
  });
  toast.success("Item added to cart");
};


// action fro when logged in users remove a product from their cart
export const removeFromUsersCart = productId => async dispatch => {
  const removeFromCartResponse = await shop.removeFromUsersCart(productId);
  dispatch({
    type: types.REMOVE_FROM_USERS_CART,
    productId: productId
  });
  toast.success("Item removed from cart");
};


export const addToCartUnsafe = (product, qty) => ({
  type: types.ADD_TO_CART,
  product: product,
  qty: qty
});


export const removeFromCart = productId => dispatch => {
  toast.success("Item Removed from Cart");
  dispatch({
    type: types.REMOVE_FROM_CART,
    productId: productId
  });
};


export const incrementQty = (product, qty) => dispatch => {
  dispatch(addToCartUnsafe(product, qty))
  toast.success("Item Added to Cart")
};


export const decrementQty = product => dispatch => {
  dispatch({
    type: types.DECREMENT_QTY,
    product: product
  });
  toast.success("Item removed from cart");
};


//Compare Products
export const addToCompare = product => dispatch => {
  toast.success("Item Added to Compare");
  dispatch(addToCompareUnsafe(product));
};


export const addToCompareUnsafe = product => ({
  type: types.ADD_TO_COMPARE,
  product
});


export const removeFromCompare = product_id => ({
  type: types.REMOVE_FROM_COMPARE,
  product_id
});


// Filters
export const filterBrand = manufacturer => ({
  type: types.FILTER_BRAND,
  manufacturer
});


export const filterColor = color => ({
  type: types.FILTER_COLOR,
  color
});


export const filterPrice = value => ({
  type: types.FILTER_PRICE,
  value
});


export const filterSort = sort_by => ({
  type: types.SORT_BY,
  sort_by
});


// Currency
export const changeCurrency = symbol => ({
  type: types.CHANGE_CURRENCY,
  symbol
});
