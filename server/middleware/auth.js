import jwt from 'jsonwebtoken';
import 'dotenv/config';

const auth = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			return req.status(401).json({ message: 'Auth error' });
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Auth error' });
	}
};

export default auth;
