import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL
} from '../constants/productConstants';

// 获取所有产品的reducer
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                products: []
            };
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload
            };
        case PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

// 获取单个产品的reducer
export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

// 删除单个产品的reducer
export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {
                loading: true
            };
        case PRODUCT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case PRODUCT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};