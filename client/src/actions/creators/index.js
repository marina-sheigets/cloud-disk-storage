import {
	ADD_FILE,
	LOGOUT,
	POP_FROM_STACK,
	PUSH_TO_STACK,
	SET_CURRENT_DIR,
	SET_FILES,
	SET_POPUP_DISPLAY,
	SET_USER,
} from '..';

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

export const logOut = () => ({
	type: LOGOUT,
});

export const setFiles = (files) => ({
	type: SET_FILES,
	payload: files,
});

export const setCurrentDir = (dir) => ({
	type: SET_CURRENT_DIR,
	payload: dir,
});

export const addFile = (file) => ({
	type: ADD_FILE,
	payload: file,
});

export const setPopupDisplay = (value) => ({
	type: SET_POPUP_DISPLAY,
	payload: value,
});

export const pushToStack = (dir) => ({
	type: PUSH_TO_STACK,
	payload: dir,
});

export const popFromStack = () => ({
	type: POP_FROM_STACK,
});
