import axios from 'axios';
import { addFile, setFiles } from '../creators';

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
			dispatch(setFiles(response.data));
		} catch (error) {
			alert(error.response.data.message);
		}
	};
};

export const createDir = (dirId, name) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(
				`http://localhost:5000/api/files`,
				{
					name,
					parent: dirId,
					type: 'dir',
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			dispatch(addFile(response.data));
		} catch (error) {
			alert(error.response.data.message);
		}
	};
};

export const uploadFile = (file, dirId) => {
	return async (dispatch) => {
		try {
			const formData = new FormData();
			formData.append('file', file);

			if (dirId) {
				formData.append('parent', dirId);
			}
			const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				// onUploadProgress: (progressEvent) => {
				// 	const totalLength = progressEvent.lengthComputable
				// 		? progressEvent.total
				// 		: progressEvent.loaded;
				// 	if (totalLength) {
				// 		let progress = Math.round((progressEvent.loaded * 100) / totalLength);
				// 		console.log(progress);
				// 	}
				// },
			});
			dispatch(addFile(response.data));
		} catch (error) {
			alert(error.response.data.message);
		}
	};
};
