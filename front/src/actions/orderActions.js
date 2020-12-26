import axios from 'axios';
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS, ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS
} from '../constants/orderConstants';
import { logout } from './userActions';

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

// 完成支付订单action
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST });
        // 获取登陆用户的信息
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (err) {
        const message = err.response
                        && err.response.data.message ? err.response.data.message : err.message;
        if (message === '未授权的请求，token不存在') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: message
        });
    }
};

// 获取登录用户所有订单action
export const getMyOrderList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST });
        // 获取登陆用户的信息
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        
        const { data } = await axios.get(`/api/orders/myorders`, config);
        dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};
