import { validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

class Auth {
	async post(req, res) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Bad credentials', errors });
			}
			const { email, password } = req.body;

			const candidate = await User.findOne({ email });

			if (candidate) {
				return res.status(400).json({ message: 'User with such email exists' });
			}

			const hashedPassword = await bcrypt.hash(password, 8);
			const user = new User({ email, password: hashedPassword });
			await user.save();
			return res.json({ message: 'User was created' });
		} catch (error) {
			console.log(e);
			res.send('Something went wrong');
		}
	}
}

export default new Auth();
