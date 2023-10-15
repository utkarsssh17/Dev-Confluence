import { Router } from 'express';
import { ensureAuthenticated } from '../controllers/helpers.js';
import * as imageController from '../controllers/images.js';

const router = Router();

// Upload profile picture
router.post('/upload', ensureAuthenticated, imageController.uploadProfilePicture);

export default router;