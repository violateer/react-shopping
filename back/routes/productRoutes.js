import express from 'express';
import Product from '../models/productModel.js';
import { awaitWrap } from '../config/tools.js';

const router = express.Router();

/**
 * @desc 请求所有产品
 * @route GET /api/products
 * @access 公开
 */
router.get('/', async (req, res) => {
        const [, products] = await awaitWrap(Product.find({}));
        if (!products) {
            res.status(404).json({ message: '查询不到任何产品!' });
        } else {
            res.json(products);
        }
    }
);

/**
 * @desc 请求单个产品
 * @route GET /api/products:id
 * @access 公开
 */
router.get('/:id', async (req, res) => {
        const [, product] = await awaitWrap(Product.findById(req.params.id));
        if (!product) {
            res.status(404).json({ message: '查询不到产品!' });
        } else {
            res.json(product);
        }
    }
);

export default router;