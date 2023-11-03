import { ADD_FILE, SET_CURRENT_DIR, SET_FILES, SET_POPUP_DISPLAY } from '../actions';

const defaultState = {
	files: [],
	currentDir: null,
	popupDisplay: 'none',
};

export default function fileReducer(state = defaultState, action) {
	switch (action.type) {
		case SET_FILES: {
			return {
				...state,
				files: action.payload,
			};
		}
		case SET_CURRENT_DIR: {
			return {
				...state,
				currentDir: action.payload,
			};
		}
		case ADD_FILE: {
			return {
				...state,
				files: [...state.files, action.payload],
			};
		}

		case SET_POPUP_DISPLAY: {
			return {
				...state,
				popupDisplay: action.payload,
			};
		}
		default:
			return state;
	}
}
