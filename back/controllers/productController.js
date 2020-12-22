import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc 请求所有产品
 * @route GET /api/products
 * @access 公开
 */
export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    if (products) {
        res.json(products);
    } else {
        res.status(404);
        throw new Error('查询不到任何产品');
    }
});

/**
 * @desc 请求单个产品
 * @route GET /api/products:id
 * @access 公开
 */
export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('查询不到该产品');
    }
});