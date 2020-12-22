import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';
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