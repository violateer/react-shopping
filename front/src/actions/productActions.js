import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constants/productConstant';
import axios from 'axios';

// 获取所有产品的action
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get('api/products');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: err.response
                     && err.response.data.message ? err.response.data.message : err.message
        });
    }
};