import express from 'express';
import { getProducts, getProductById, deleteProductById } from '../controllers/productController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
      .get(getProducts);

router.route('/:id')
      .get(getProductById)
      .delete(protect, isAdmin, deleteProductById);

export default router;