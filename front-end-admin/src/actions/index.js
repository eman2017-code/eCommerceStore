// api calls come from here
import shop from "./api/shop";
// actionTypes
import * as types from "../constants/ActionTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// register user action
export const registerUser = registrationInfo => async dispatch => {
  // api call to register method inside shop
  const registrationResponse = await shop.registerUser(registrationInfo);
  const userInfo = registrationResponse.data;

  // if success
  if (registrationResponse.status.code === 201) {
    // user info should now be in store
    dispatch({
      type: types.LOGIN,
      userInfo: userInfo
    });
    // congrats, they are now logged in
    toast.success(registrationResponse.status.message);
  } else {
    toast.error(registrationResponse.status.message);
  }
};
