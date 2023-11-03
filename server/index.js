import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import authRouter from './routes/auth.routes.js';
import filesRouter from './routes/file.routes.js';
import corsMiddleware from './middleware/cors.js';
import fileUpload from 'express-fileupload';

const app = express();

app.use(fileUpload({}));
app.use(express.json());
app.use(corsMiddleware);
app.use('/api/auth', authRouter);
app.use('/api/files', filesRouter);

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
