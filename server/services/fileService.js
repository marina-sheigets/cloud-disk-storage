import fs from 'fs';
import File from '../models/File.js';
import 'dotenv/config';

class FileService {
	createDir(req, file) {
		const filePath = this.getPath(req, file);
		return new Promise((resolve, reject) => {
			try {
				if (!fs.existsSync(filePath)) {
					fs.mkdirSync(filePath);
					return resolve({ message: 'File was created' });
				} else {
					return reject({ message: 'File already exists' });
				}
			} catch (error) {
				console.log(error);
				return reject({ message: 'File error' });
			}
		});
	}

	deleteFile(req, file) {
		const filePath = this.getPath(req, file);
		if (file.type === 'dir') {
			fs.rmdirSync(filePath);
		} else {
			fs.unlinkSync(filePath);
		}
	}

	getPath(req, file) {
		return `${req.filePath}\\${file.user}\\${file.path}`;
	}
}

export default new FileService();
