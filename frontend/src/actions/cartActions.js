import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants';
import axios from 'axios';

// 添加产品
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    });
    
    // 将信息存储到本地
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// 删除产品
export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    });
    
    // 更新本地存储的信息
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// 保存收货地址action
export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    });
    
    // 更新本地存储的信息
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

// 保存支付方式action
export const savePaymentMethod = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    });
    
    // 更新本地存储的信息
    localStorage.setItem('paymentMethod', JSON.stringify(data));
};