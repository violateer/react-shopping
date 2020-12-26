import express from 'express';
import {
    addOrderItems,
    getMyOrders,
    getOrderItems,
    getOrders,
    updateOrderById
} from '../controllers/orderController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
      .post(protect, addOrderItems)
      .get(protect, isAdmin, getOrders);

router.route('/myorders')
      .get(protect, getMyOrders);

router.get('/:id', protect, getOrderItems);

router.route('/:id/pay')
      .put(protect, updateOrderById);

export default router;