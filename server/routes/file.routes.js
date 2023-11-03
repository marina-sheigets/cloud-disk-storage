import Router from 'express';
import authMiddleware from '../middleware/auth.js';
import fileController from '../controllers/fileController.js';
const router = new Router();

router.post('', authMiddleware, fileController.createDir);
router.get('', authMiddleware, fileController.fetchFiles);

export default router;