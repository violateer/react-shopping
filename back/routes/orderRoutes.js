import express from 'express';
import { addOrderItems } from '../controllers/orderController';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addOrderItems);

export default router;