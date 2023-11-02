import Router from 'express';
import Auth from '../services/Auth.js';
import { check } from 'express-validator';

const router = Router();

router.post(
	'/registration',
	[
		check('email', 'Incorrect email').isEmail(),
		check('password', 'Password mush be longer than 6 characters').isLength({ min: 6 }),
	],
	Auth.register
);

router.post('/login', Auth.login);

export default router;
