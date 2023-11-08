import fs from 'fs';
import File from '../models/File.js';
import 'dotenv/config';

class FileService {
	createDir(file) {
		const filePath = `${process.env.FILE_PATH}\\${file.user}\\${file.path}`;
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

	deleteFile(file) {
		const filePath = this.getPath(file);
		if (file.type === 'dir') {
			fs.rmdirSync(filePath);
		} else {
			fs.unlinkSync(filePath);
		}
	}

	getPath(file) {
		return `${process.env.FILE_PATH}\\${file.user}\\${file.path}`;
	}
}

export default new FileService();
