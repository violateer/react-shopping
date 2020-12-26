import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc 请求所有产品
 * @route GET /api/products?keyword=${keyword}
 * @access 公开
 */
export const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            // 不完全匹配
            $regex: req.query.keyword,
            // 不区分大小写
            $options: 'i'
        }
    } : {};
    const products = await Product.find({ ...keyword });
    if (products) {
        res.json(products);
    } else {
        res.status(404);
        throw new Error('查询不到任何产品');
    }
});

/**
 * @desc 请求单个产品
 * @route GET /api/products/:id
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

/**
 * @desc 删除单个产品
 * @route DELETE /api/products/:id
 * @access 私密-带token-管理员
 */
export const deleteProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: '产品删除成功' });
    } else {
        res.status(404);
        throw new Error('查询不到该产品');
    }
});

/**
 * @desc 创建产品
 * @route POST /api/products
 * @access 私密-带token-管理员
 */
export const createProduct = asyncHandler(async (req, res) => {
    // 创建一个产品模板
    const product = new Product({
        name: '样品产品',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: '样品品牌',
        category: '样品分类',
        countInStock: 0,
        numReviews: 0,
        description: '样品描述',
        rating: 0
    });
    
    // 保存产品
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

/**
 * @desc 更新产品信息
 * @route PUT /api/products/:id
 * @access 私密-带token-管理员
 */
export const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, image, description, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (product) {
        product.name = name;
        product.price = price;
        product.image = image;
        product.description = description;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        
        const updatedProduct = await product.save();
        res.status(201).json({ updatedProduct });
    } else {
        res.status(404);
        throw new Error('未找到该产品');
    }
});

/**
 * @desc 创建产品评论
 * @route POST /api/products/:id/reviews
 * @access 私密-带token
 */
export const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (product) {
        // 判断该用户是否已评论
        const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('您已经评论过该产品！');
        }
        
        // 创建评论
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        };
        product.reviews.push(review);
        
        // 更新评论数及总评分
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.numReviews;
        await product.save();
        res.status(201);
        res.json({ message: '评论成功' });
    } else {
        res.status(404);
        throw new Error('未找到该产品');
    }
});