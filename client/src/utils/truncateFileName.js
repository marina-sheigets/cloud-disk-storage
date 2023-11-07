export const truncateFileName = (fileName, maxDisplayLength = 9) => {
	if (fileName.length > maxDisplayLength) {
		return `${fileName.substring(0, maxDisplayLength)}...`;
	}
	return fileName;
};
