import { LOGOUT, SET_USER } from '..';

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

export const logOut = () => ({
	type: LOGOUT,
});
