import { LOGIN, REGISTER, LOGOUT } from "../constants/ActionTypes"

const initialState = {
	isLoggedIn: false,
	userInfo: {}
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
			return {
				...state,
				isLoggedIn: false,
				userInfo: {}
			}

		default:
			return state
	} 

}

