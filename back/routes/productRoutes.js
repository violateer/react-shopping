import express from 'express';
import Product from '../models/productModel.js';
import { awaitWrap } from '../config/tools.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

/**
 * @desc 请求所有产品
 * @route GET /api/products
 * @access 公开
 */
router.get('/', asyncHandler(async (req, res) => {
        const products = await awaitWrap(Product.find({}));
        if (products) {
            res.json(products);
        } else {
            res.status(404);
            throw new Error('查询不到任何产品');
        }
    })
);

/**
 * @desc 请求单个产品
 * @route GET /api/products:id
 * @access 公开
 */
router.get('/:id', asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('查询不到该产品');
        }
    })
);

export default router;