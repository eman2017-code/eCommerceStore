import shop from "../api/shop";
import * as types from "../constants/ActionTypes";
// import store from "../store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// registers a new user
export const registerUser = registrationInfo => async dispatch => {
  // makes the api call to register
  const registrationResponse = await shop.registerUser(registrationInfo);
  const userInfo = registrationResponse.data;

  if (registrationResponse.status.code === 201) {

    // gets the user cart
    const getUsersCartResponse = await shop.getUsersCart(userInfo._id)
    const usersCart = getUsersCartResponse.data

    // sets the users cart in the store
    dispatch({
      type: types.SET_USERS_CART,
      cart: usersCart
    })

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
    const getUsersCartResponse = await shop.getUsersCart(userInfo._id)
    const usersCart = getUsersCartResponse.data

    // sets the users cart in the store
    dispatch({
      type: types.SET_USERS_CART,
      cart: usersCart
    })

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

  if (logoutResponse.status.code === 200) {

    // removes the users cart from the state
    dispatch({
      type: types.REMOVE_USERS_CART
    })

    dispatch({
      type: types.LOGOUT
    });
    toast.success(logoutResponse.status.message);
  } else {
    toast.error(logoutResponse.status.message);
  }
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

export const getUsersCart = (userId) => async dispatch => {
  const cartResponse = await shop.getUsersCart(userId)
  console.log('cartResponse in actions:', cartResponse)
};

//it seems that I should probably use this as the basis for "Cart"
export const addToCart = (product, qty) => dispatch => {
  toast.success("Item Added to Cart");
  dispatch(addToCartUnsafe(product, qty));
};

export const clearCart = () => dispatch => {
  dispatch({
    type: 'CLEAR_CART'
  })
}

export const addToUsersCart = (product, quantity) => async dispatch => {
  const productId = product.upc

  const addToCartResponse = await shop.addToUsersCart(productId, quantity)

  dispatch({
    type: types.ADD_TO_USERS_CART,
    product: product,
    quantity: quantity
  })
}

export const removeFromUsersCart = (product) => async dispatch => {
  const productId = product.upc

  const removeFromCartResponse = await shop.removeFromUsersCart(productId)

  // dispatch({
    
  // })

}

export const addToCartUnsafe = (product, qty) => ({
  type: types.ADD_TO_CART,
  product,
  qty
});

export const removeFromCart = product_id => dispatch => {
  toast.error("Item Removed from Cart");
  dispatch({
    type: types.REMOVE_FROM_CART,
    product_id
  });
};

export const incrementQty = (product, qty) => dispatch => {
  toast.success("Item Added to Cart");
  dispatch(addToCartUnsafe(product, qty));
};

export const decrementQty = productId => dispatch => {
  toast.warn("Item Decrement Qty to Cart");

  dispatch({
    type: types.DECREMENT_QTY,
    productId
  });
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
