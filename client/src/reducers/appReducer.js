import { HIDE_LOADER, SHOW_LOADER } from '../actions';

const defaultState = {
	loader: false,
};

export default function appReducer(state = defaultState, action) {
	switch (action.type) {
		case SHOW_LOADER: {
			return {
				...state,
				loader: true,
			};
		}
		case HIDE_LOADER: {
			return {
				...state,
				loader: false,
			};
		}
		default:
			return state;
	}
}
