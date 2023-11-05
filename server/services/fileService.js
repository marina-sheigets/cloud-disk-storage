import fs from 'fs';
import File from '../models/File.js';
import config from 'config';

class FileService {
	createDir(file) {
		const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`;
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
		return `${config.get('filePath')}\\${file.user}\\${file.path}`;
	}
}

export default new FileService();
