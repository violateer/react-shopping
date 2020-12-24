import express from 'express';
import { addOrderItems, getOrderItems } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id', protect, getOrderItems);
router.post('/', protect, addOrderItems);

export default router;