import fileService from '../services/fileService.js';
import User from '../models/User.js';
import File from '../models/File.js';
import config from 'config';
import fs from 'fs';
import { SORTING } from '../constants/index.js';

class FileController {
	async createDir(req, res) {
		try {
			const { name, type, parent } = req.body;
			const file = new File({ name, type, parent, user: req.user.id });
			const parentFile = await File.findOne({ _id: parent });
			if (!parentFile) {
				file.path = name;
				await fileService.createDir(file);
			} else {
				file.path = `${parentFile.path}\\${file.name}`;
				await fileService.createDir(file);
				parentFile.childs.push(file._id);
				await parentFile.save();
			}
			await file.save();
			return res.json(file);
		} catch (error) {
			console.log(error);
			return res.status(400).json(error);
		}
	}

	async fetchFiles(req, res) {
		try {
			const { sort } = req.query;
			let files;
			switch (sort) {
				case SORTING.NAME: {
					files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({
						name: 1,
					});
					break;
				}
				case SORTING.TYPE: {
					files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({
						type: 1,
					});
					break;
				}
				case SORTING.DATE: {
					files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({
						date: 1,
					});
					break;
				}
				case SORTING.SIZE: {
					files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({
						size: 1,
					});
					break;
				}
				default:
					files = await File.find({ user: req.user.id, parent: req.query.parent });
			}
			return res.json(files);
		} catch (error) {
			console.log(error);
			return res.status(400).json({ message: 'Cannot get files' });
		}
	}

	async uploadFile(req, res) {
		try {
			const { file } = req.files;

			const parent = await File.findOne({ user: req.user.id, _id: req.body.parent });
			const user = await User.findOne({ _id: req.user.id });

			if (user.usedSpace + file.size > user.diskSpace) {
				return res.status(400).json({ message: 'There is no enough space on your disk' });
			}

			user.usedSpace += file.size;

			let path;
			if (parent) {
				path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`;
			} else {
				path = `${config.get('filePath')}\\${user._id}\\${file.name}`;
			}

			if (fs.existsSync(path)) {
				return res.status(400).json({ message: 'File already exists' });
			}

			file.mv(path);

			const type = file.name.split('.').pop();
			let filePath = file.name;
			if (parent) {
				filePath = parent.path + '\\' + file.name;
			}
			const dbFile = new File({
				name: file.name,
				type,
				size: file.size,
				path: filePath,
				parent: parent?._id,
				user: user._id,
			});

			await dbFile.save();
			await user.save();

			return res.json(dbFile);
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: 'Upload error' });
		}
	}

	async downloadFile(req, res) {
		try {
			const file = await File.findOne({ _id: req.query.id, user: req.user.id });

			const path =
				config.get('filePath') + '\\' + req.user.id + '\\' + file.path + '\\' + file.name;
			if (fs.existsSync(path)) {
				return res.download(path, file.name);
			}
			return res.status(400).json({ message: "File doesn't exist" });
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: 'Download error' });
		}
	}

	async deleteFile(req, res) {
		try {
			const file = await File.findOne({ _id: req.query.id, user: req.user.id });

			if (!file) {
				return res.status(400).json({ message: 'File not found' });
			}

			fileService.deleteFile(file);
			await File.deleteOne({ _id: req.query.id, user: req.user.id });
			return res.json({ message: 'File was deleted successfully' });
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: 'Delete error' });
		}
	}

	async searchFile(req, res) {
		try {
			const search = req.query.search;
			let files = await File.find({ user: req.user.id });
			files = files.filter((file) => file.name.includes(search));
			return res.json({ files });
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: 'Search error' });
		}
	}
}

export default new FileController();
