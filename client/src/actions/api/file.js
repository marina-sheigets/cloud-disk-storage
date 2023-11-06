import axios from 'axios';
import {
	addFile,
	addUploadFileAction,
	changeUploadFileAction,
	deleteFileAction,
	hideLoaderAction,
	setFiles,
	showLoaderAction,
	showUploaderAction,
} from '../creators';

export const getFiles = (dirId, sort) => {
	return async (dispatch) => {
		try {
			dispatch(showLoaderAction());
			let url = `http://localhost:5000/api/files`;
			if (dirId) {
				url = `http://localhost:5000/api/files?parent=${dirId}`;
			}
			if (sort) {
				url = `http://localhost:5000/api/files?sort=${sort}`;
			}

			if (sort && dirId) {
				url = `http://localhost:5000/api/files?sort=${sort}&parent=${dirId}`;
			}
			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			dispatch(setFiles(response.data));
		} catch (error) {
			alert(error.response.data.message);
		} finally {
			dispatch(hideLoaderAction());
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

			const uploadFile = { name: file.name, progress: 0, id: Date.now() };
			dispatch(showUploaderAction());
			dispatch(addUploadFileAction(uploadFile));
			const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				onUploadProgress: (progressEvent) => {
					const totalLength = progressEvent.lengthComputable
						? progressEvent.total
						: progressEvent.loaded;
					if (totalLength) {
						uploadFile.progress = Math.round(
							(progressEvent.loaded * 100) / totalLength
						);
						dispatch(changeUploadFileAction(uploadFile));
					}
				},
			});
			dispatch(addFile(response.data));
		} catch (error) {
			alert(error.response.data.message);
		}
	};
};

export async function downloadFile(file) {
	const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	});

	if (response.status) {
		const blob = await response.blob();
		const downloadUrl = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = downloadUrl;
		link.download = file.name;
		document.body.appendChild(link);
		link.click();
		link.remove();
	}
}

export function deleteFile(file) {
	return async (dispatch) => {
		try {
			const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});

			dispatch(deleteFileAction(file._id));
			alert(response.data.message);
		} catch (e) {
			alert(e?.response?.data.message);
		}
	};
}
