const MAX_DISPLAY_LENGTH = 9;
export const truncateFileName = (fileName) => {
	if (fileName.length > MAX_DISPLAY_LENGTH) {
		return `${fileName.substring(0, MAX_DISPLAY_LENGTH)}...`;
	}
	return fileName;
};
