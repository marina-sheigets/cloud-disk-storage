function staticPath(path) {
	return function (req, res, next) {
		req.staticPath = path;
		next();
	};
}

export default staticPath;
