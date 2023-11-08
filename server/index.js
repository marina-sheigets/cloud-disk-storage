import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes.js';
import filesRouter from './routes/file.routes.js';
import corsMiddleware from './middleware/cors.js';
import fileUpload from 'express-fileupload';
import 'dotenv/config';
import filePathMiddleware from './middleware/filePath.js';
import path from 'path';
const app = express();

app.use(fileUpload({}));
app.use(express.json());
app.use(corsMiddleware);
app.use(filePathMiddleware(path.resolve(__dirname, 'files')));
app.use(express.static('static'));
app.use('/api/auth', authRouter);
app.use('/api/files', filesRouter);

const PORT = process.env.SERVER_PORT || 5000;
const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL);
		app.listen(PORT, () => {
			console.log('Server is running on PORT=' + PORT);
		});
	} catch (error) {
		console.error(error);
	}
};

start();

export default app;
