import shop from "../api/shop.js";
import * as types from "../constants/ActionTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// registers a new user
export const registerUser = registrationInfo => async dispatch => {
  // makes the api call to register
  const registrationResponse = await shop.registerUser(registrationInfo);
  const userInfo = registrationResponse.data;

  if (registrationResponse.status.code === 201) {
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
  console.log("loginResponse:", loginResponse);
  const userInfo = loginResponse.data;

  // if the user successfully logged in
  if (loginResponse.status.code === 200) {
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

  // removes logged in user from the state
  dispatch({
    type: types.LOGOUT
  });

  toast.success(logoutResponse.status.message);
};

// route to list all admin-created products
export const listProductsAdmin = () => async dispatch => {
  // makes api call to index product route for admin
  const allProducts = await shop.listProductsAdmin();

  dispatch({
    type: types.LIST_PRODUCTS_ADMIN
  });

  toast.success(allProducts.status.message);
};
