import Order from '../models/orderModel';
import asyncHandler from 'express-async-handler';

/**
 * @desc 创建订单
 * @route POST /api/orders
 * @access 私密
 */
export const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemPrice, shippingPrice, totalPrice } = req.body;
    
    if (orderItems && orderItems === 0) {
        res.status(400);
        throw new Error('没有订单信息');
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemPrice,
            shippingPrice,
            totalPrice
        });
        
        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
});