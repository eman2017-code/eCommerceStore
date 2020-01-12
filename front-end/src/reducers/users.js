import { LOGIN, REGISTER, LOGOUT } from "../constants/ActionTypes"

const initialState = {
	isLoggedIn: false,
	userInfo: "",
	cartId: ""
}

export default function usersReducer(state=initialState, action) {
	switch (action.type) {

		case LOGIN:
			return {
				...state,
				isLoggedIn: true,
				userInfo: action.userInfo
			}

		case REGISTER:
			console.log('REGISTER action')

		case LOGOUT:
			console.log('LOGOUT action')

		default:
			console.log('default action')
			return state
	} 

}

