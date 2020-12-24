import {
    USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS
} from '../constants/userConstants';
import axios from 'axios';

// 用户登录action
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        
        const { data } = await axios.post('/api/users/login', { email, password }, config);
        // 派发获取到的信息
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        // 将信息存储到本地
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

// 用户退出action
export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
};

// 用户注册action
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        
        const { data } = await axios.post('/api/users', { name, email, password }, config);
        // 派发获取到的信息   注册+登录
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        // 将信息存储到本地
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

// 用户信息action
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        // 获取登陆用户的信息
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        
        const { data } = await axios.get(`/api/users/${id}`, config);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

// 更新用户信息action
export const updateUserDetails = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
        // 获取登陆用户的信息
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        
        const { data } = await axios.put(`/api/users/profile`, user, config);
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
        // 重置更新用户资料
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

// 用户列表action
export const getUserList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });
        // 获取登陆用户的信息
        const { userLogin: { userInfo } } = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        
        const { data } = await axios.get(`/api/users`, config);
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};