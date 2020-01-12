import { LOGIN, REGISTER, LOGOUT } from "../constants/ActionTypes"

const initialState = {
	isLoggedIn: false,
	userId: "",
	cartId: ""
}

export default function usersReducer(state=initialState, action) {
	switch (action) {

		case LOGIN:
			console.log('LOGIN action')

		case REGISTER:
			console.log('REGISTER action')

		case LOGOUT:
			console.log('REGISTER action')

		default:
			console.log('default action')
			return state
	} 

}

