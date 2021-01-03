import express from 'express';
import {
    addOrderItems,
    getMyOrders,
    getOrderItems,
    getOrders, updateOrderToDelivered,
    updateOrderToPaid
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
      .put(protect, updateOrderToPaid);

router.route('/:id/deliver')
      .put(protect, isAdmin, updateOrderToDelivered);

export default router;