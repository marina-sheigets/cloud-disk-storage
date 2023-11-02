import express from 'express';
import mongoose from 'mongoose';
import config from 'config';

const app = express();
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
