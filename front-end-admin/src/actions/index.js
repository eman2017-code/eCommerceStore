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
  const userInfo = loginResponse.data;

  // if the user successfully logged in
  if (loginResponse.status.code === 200) {
    dispatch({
      type: types.LOGIN,
      userInfo: userInfo
    });
    toast.success(loginResponse.status.message, {
      position: toast.POSITION.TOP_CENTER
    });

    // makes fetch call to get all the admins products
    const getProductsResponse = await shop.getAllProducts();
    const adminsProducts = getProductsResponse.data;

    // if the request was successful, the admins products are put in the store
    if (getProductsResponse.status.code === 200) {
      dispatch({
        type: types.GET_PRODUCTS,
        products: adminsProducts
      });
    } else {
      toast.error(getProductsResponse.status.message, {
        position: toast.POSITION.TOP_CENTER
      });
    }

  } else {
    toast.error(loginResponse.status.message);
  }
};


// logs out a user
export const logoutUser = () => async dispatch => {
  // makes the api call to logout
  const logoutResponse = await shop.logoutUser();

  // removes all of the admins products in the store
  dispatch({
    type: types.CLEAR_PRODUCTS
  })

  // removes logged in user from the state
  dispatch({
    type: types.LOGOUT
  });

  toast.success(logoutResponse.status.message);
};


// creates a new product
export const createProduct = productData => async dispatch => {
  const createdProductResponse = await shop.createProduct(productData);

  // if the product was created successfully
  if (createdProductResponse.status.code === 201) {
    const newProduct = createdProductResponse.data;

    dispatch({
      type: types.CREATE_PRODUCT,
      product: newProduct
    });
    toast.success(createdProductResponse.status.message, {
      position: toast.POSITION.TOP_CENTER
    });

  // if an error occured
  } else {
    toast.error(createdProductResponse.status.message, {
      position: toast.POSITION.TOP_CENTER
    });
  }
}


export const updateProduct = productData => async dispatch => {
  const updatedProductResponse = await shop.updateProduct(productData);
  const updatedProduct = updatedProductResponse.data;

}


export const deleteProduct = productId => async dispatch => {
  const deleteProductResponse = await shop.deleteProduct(productId);

  if (deleteProductResponse.status.code === 204) {
    dispatch({
      type: types.DELETE_PRODUCT,
      productId: productId
    });
    toast.success(deleteProductResponse.status.message, {
      position: toast.POSITION.TOP_CENTER
    }); 

  } else {
    toast.error(deleteProductResponse.status.message, {
      position: toast.POSITION.TOP_CENTER
    }); 
  }
}

