import express from 'express';
import { authUser, getUserProfile, getUsers, registerUser, updateUserProfile } from '../controllers/userController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, isAdmin, getUsers);
router.post('/', registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;