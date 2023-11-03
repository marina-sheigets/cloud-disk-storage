import { validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import fileService from './fileService.js';
import File from '../models/File.js';
class Auth {
	async register(req, res) {
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

			const hashedPassword = await bcrypt.hash(password, 5);
			const user = new User({ email, password: hashedPassword });
			await user.save();
			await fileService.createDir(new File({ user: user.id, name: '' }));
			return res.json({ message: 'User was created' });
		} catch (error) {
			console.log(error);
			res.send('Something went wrong');
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			const isPassValid = bcrypt.compareSync(password, user.password);
			if (!isPassValid) {
				return res.status(400).json({ message: 'User not found' });
			}

			const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });
			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					diskSpace: user.diskSpace,
					files: user.files,
					usedSpace: user.usedSpaces,
				},
			});
		} catch (error) {
			console.log(e);
			res.send('Something went wrong');
		}
	}

	async auth(req, res) {
		try {
			const user = await User.findOne({ _id: req.user.id });

			const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });
			return res.json({
				token,
				user: {
					id: user.id,
					email: user.email,
					diskSpace: user.diskSpace,
					files: user.files,
					usedSpace: user.usedSpaces,
				},
			});
		} catch (error) {
			console.log(e);
			res.send('Something went wrong');
		}
	}
}

export default new Auth();
