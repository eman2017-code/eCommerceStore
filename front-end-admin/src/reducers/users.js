import { LOGIN, LOGOUT } from "../constants/ActionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: {}
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo
      };

    case LOGOUT:
      return {
        isLoggedIn: false,
        userInfo: {}
      };

    default:
      return state;
  }
}
