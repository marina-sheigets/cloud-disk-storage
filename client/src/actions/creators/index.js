import { LOGOUT, SET_CURRENT_DIR, SET_FILES, SET_USER } from '..';

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
