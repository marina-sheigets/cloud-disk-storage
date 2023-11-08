function cors(req, res, next) {
	res.setHeader(
		'Access-Control-Allow-Origin',
		'https://cloud-disk-storage-jh5eerlqz-marina-sheigets-projects.vercel.app'
	);
	res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
}

export default cors;
