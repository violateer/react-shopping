import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL
} from '../constants/productConstants';
import axios from 'axios';

// 获取所有产品的action
export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

// 获取单个产品的action
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

// 删除单个产品action
export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST });
        // 获取登陆用户的信息
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        
        await axios.delete(`/api/products/${id}`, config);
        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (err) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

// 创建单个产品action
export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });
        // 获取登陆用户的信息
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const { data } = await axios.post(`/api/products`, {}, config);
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

// 更新产品action
export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST });
        // 获取登陆用户的信息
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const { data } = await axios.put(`/api/products/${product._id}`, product, config);
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

// 创建产品评论action
export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
        // 获取登陆用户的信息
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const { data } = await axios.post(`/api/products/${productId}/reviews`, review, config);
        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (err) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

// 获取评分前三产品的action
export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST });
        const { data } = await axios.get(`/api/products/top`);
        dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};