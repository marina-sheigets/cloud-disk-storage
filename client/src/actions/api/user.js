import axios from 'axios';
import { setUser } from '../creators';
import { API_URL } from '../../config';

export const registration = async (email, password) => {
	try {
		const response = await axios.post(`${API_URL}api/auth/registration/`, {
			email,
			password,
		});
		alert(response.data.message);
	} catch (error) {
		alert(error.response.data.message);
	}
};

export const login = (email, password) => async (dispatch) => {
	try {
		const response = await axios.post(`${API_URL}api/auth/login/`, {
			email,
			password,
		});

		dispatch(setUser(response.data.user));
		localStorage.setItem('token', response.data.token);
	} catch (error) {
		alert(error.response.data.message);
	}
};

export const auth = () => async (dispatch) => {
	try {
		const response = await axios.get(`${API_URL}api/auth/auth/`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});

		dispatch(setUser(response.data.user));
		localStorage.setItem('token', response.data.token);
	} catch (error) {
		alert(error.response.data.message);
		localStorage.removeItem('token');
	}
};

export const uploadAvatar = (file) => async (dispatch) => {
	try {
		const formData = new FormData();
		formData.append('file', file);
		const response = await axios.post(`${API_URL}api/files/avatar`, formData, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});

		dispatch(setUser(response.data.user));
		alert(response.data.message);
	} catch (error) {
		alert(error.response.data.message);
	}
};

export const deleteAvatar = () => async (dispatch) => {
	try {
		const response = await axios.delete(`${API_URL}api/files/avatar`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});

		dispatch(setUser(response.data.user));
		alert(response.data.message);
	} catch (error) {
		alert(error.response.data.message);
	}
};
