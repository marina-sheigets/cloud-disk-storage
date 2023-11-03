import axios from 'axios';
import { setFiles } from '../creators';

export const getFiles = (dirId) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(
				`http://localhost:5000/api/files${dirId ? `?parent=${dirId}` : ''}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			console.log(response);
			dispatch(setFiles(response.data));
		} catch (error) {
			alert(error.response.data.message);
		}
	};
};
