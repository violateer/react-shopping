import axios from 'axios';
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS
} from '../constants/orderConstants';

// 创建订单action
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });
        // 获取登陆用户的信息
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        
        const { data } = await axios.post(`/api/orders`, order, config);
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

// 获取单个订单action
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        // 获取登陆用户的信息
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        
        const { data } = await axios.get(`/api/orders/${id}`, config);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

// 获取所有订单action
export const getOrderList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });
        // 获取登陆用户的信息
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        
        const { data } = await axios.get(`/api/orders`, config);
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};
