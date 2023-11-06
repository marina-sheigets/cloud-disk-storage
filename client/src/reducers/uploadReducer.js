import {
	ADD_UPLOAD_FILE,
	CHANGE_UPLOAD_FILE,
	HIDE_UPLOADER,
	REMOVE_UPLOAD_FILE,
	SHOW_UPLOADER,
} from '../actions/index';

const defaultState = {
	isVisible: false,
	files: [],
};

export default function uploadReducer(state = defaultState, action) {
	switch (action.type) {
		case SHOW_UPLOADER: {
			return {
				...state,
				isVisible: true,
			};
		}
		case HIDE_UPLOADER: {
			return {
				...state,
				isVisible: false,
				files: [],
			};
		}
		case ADD_UPLOAD_FILE: {
			return {
				...state,
				files: [...state.files, action.payload],
			};
		}
		case REMOVE_UPLOAD_FILE: {
			return {
				...state,
				files: state.files.filter((file) => file.id !== action.payload),
			};
		}
		case CHANGE_UPLOAD_FILE: {
			return {
				...state,
				files: [
					...state.files.map((file) => {
						if (file.id === action.payload.id) {
							return {
								...file,
								progress: action.payload.progress,
							};
						}
						return file;
					}),
				],
			};
		}
		default:
			return state;
	}
}
