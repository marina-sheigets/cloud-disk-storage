import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import authRouter from './routes/auth.routes.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);
const PORT = config.get('serverPort');
const start = async () => {
	try {
		await mongoose.connect(config.get('dbURL'));
		app.listen(PORT, () => {
			console.log('Server is running on PORT=' + PORT);
		});
	} catch (error) {
		console.error(error);
	}
};

start();
