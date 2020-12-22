import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from '../constants/userConstants';
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