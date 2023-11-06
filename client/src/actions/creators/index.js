import {
	ADD_FILE,
	ADD_UPLOAD_FILE,
	CHANGE_UPLOAD_FILE,
	DELETE_FILE,
	HIDE_LOADER,
	HIDE_UPLOADER,
	LOGOUT,
	POP_FROM_STACK,
	PUSH_TO_STACK,
	REMOVE_UPLOAD_FILE,
	SET_CURRENT_DIR,
	SET_FILES,
	SET_POPUP_DISPLAY,
	SET_USER,
	SHOW_LOADER,
	SHOW_UPLOADER,
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

export const deleteFileAction = (fileId) => ({
	type: DELETE_FILE,
	payload: fileId,
});

export const showUploaderAction = () => ({
	type: SHOW_UPLOADER,
});

export const hideUploaderAction = () => ({
	type: HIDE_UPLOADER,
});

export const addUploadFileAction = (file) => ({
	type: ADD_UPLOAD_FILE,
	payload: file,
});

export const removeUploadFileAction = (fileId) => ({
	type: REMOVE_UPLOAD_FILE,
	payload: fileId,
});

export const changeUploadFileAction = (data) => ({
	type: CHANGE_UPLOAD_FILE,
	payload: data,
});

export const showLoaderAction = () => ({
	type: SHOW_LOADER,
});

export const hideLoaderAction = () => ({
	type: HIDE_LOADER,
});
