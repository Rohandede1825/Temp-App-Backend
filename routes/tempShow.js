import express from 'express';
import upload from '../middleware/upload.js';
import { uploadFile } from '../controller/tempShowController.js';

const router = express.Router();

// Upload JSON file
router.post('/upload', upload.single('file'), uploadFile);

export default router;
