import express from 'express';
import {
    getProducts,
    getProductById,
    deleteProductById,
    createProduct,
    updateProduct, createProductReview
} from '../controllers/productController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
      .get(getProducts)
      .post(protect, isAdmin, createProduct);

router.route('/:id')
      .get(getProductById)
      .delete(protect, isAdmin, deleteProductById)
      .put(protect, isAdmin, updateProduct);

router.route('/:id/reviews')
      .post(protect, createProductReview);

export default router;