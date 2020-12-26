import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc 创建订单
 * @route POST /api/orders
 * @access 私密
 */
export const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;
    
    if (orderItems && orderItems === 0) {
        res.status(400);
        throw new Error('没有订单信息');
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        });
        
        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
});

/**
 * @desc 获取所有订单
 * @route GET /api/orders
 * @access 私密-带token-仅限管理员
 */
export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    if (orders.length !== 0) {
        res.json(orders);
    } else {
        res.status(404);
        throw new Error('未查询到订单');
    }
});

/**
 * @desc 获取订单-依据订单id
 * @route GET /api/orders/:id
 * @access 私密
 */
export const getOrderItems = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('查找不到订单');
    }
});

/**
 * @desc 更新支付订单
 * @route PUT /api/orders/:id/pay
 * @access 私密-带token-仅限管理员
 */
export const updateOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        };
        
        const updateOrder = await order.save();
        res.json(updateOrder);
    } else {
        res.status(404);
        throw new Error('未查询到订单');
    }
});

/**
 * @desc 获取登录用户所有订单
 * @route GET /api/orders/myorders
 * @access 私密-带token
 */
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    if (orders) {
        res.json(orders);
    } else {
        res.status(404);
        throw new Error('未查询到任何订单');
    }
});