import fileService from '../services/fileService.js';
import User from '../models/User.js';
import File from '../models/File.js';
import fs from 'fs';
import { SORTING } from '../constants/index.js';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';

class FileController {
	async createDir(req, res) {
		try {
			const { name, type, parent } = req.body;
			const file = new File({ name, type, parent, user: req.user.id });
			const parentFile = await File.findOne({ _id: parent });
			if (!parentFile) {
				file.path = name;
				await fileService.createDir(req, file);
			} else {
				file.path = `${parentFile.path}\\${file.name}`;
				await fileService.createDir(req, file);
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
				path = `${req.filePath}\\${user._id}\\${parent.path}\\${file.name}`;
			} else {
				path = `${req.filePath}\\${user._id}\\${file.name}`;
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
				parent: parent ? parent._id : null,
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

			const path = fileService.getPath(req, file);
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

			fileService.deleteFile(req, file);
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

	async uploadAvatar(req, res) {
		try {
			let file = req.files.file;
			const user = await User.findById(req.user.id);
			const avatarName = uuidv4() + '.jpg';
			file.mv(req.staticPath + '\\' + avatarName);
			user.avatar = avatarName;
			await user.save();
			return res.json({ message: 'Avatar was saved', user });
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: 'Upload avatar error' });
		}
	}

	async removeAvatar(req, res) {
		try {
			const user = await User.findById(req.user.id);
			fs.unlinkSync(req.staticPath + '\\' + user.avatar);
			user.avatar = null;
			await user.save();
			return res.json({ message: 'Avatar was removed', user });
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: 'Remove avatar error' });
		}
	}
}

export default new FileController();
