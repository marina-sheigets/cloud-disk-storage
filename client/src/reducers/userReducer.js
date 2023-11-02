import { LOGOUT, SET_USER } from '../actions';

const defaultState = {
	currentUser: {},
	isAuth: false,
};

export default function userReducer(state = defaultState, action) {
	switch (action.type) {
		case SET_USER: {
			return {
				...state,
				currentUser: action.payload,
				isAuth: true,
			};
		}

		case LOGOUT: {
			localStorage.removeItem('token');
			return {
				currentUser: {},
				isAuth: false,
			};
		}
		default:
			return state;
	}
}
