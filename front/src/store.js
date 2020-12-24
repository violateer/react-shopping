import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDeleteReducer, productDetailsReducer, productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
    userDeleteReducer,
    userDetailsReducer, userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer, userUpdateReducer
} from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer
});

// 获取本地存储的购物车信息
const cartItemFromStorage = localStorage.getItem('cartItems')
                            ? JSON.parse(localStorage.getItem('cartItems'))
                            : [];
// 获取本地存储的登陆用户信息
const userInfoFromStorage = localStorage.getItem('userInfo')
                            ? JSON.parse(localStorage.getItem('userInfo'))
                            : null;
// 获取本地存储的收货地址
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
                                   ? JSON.parse(localStorage.getItem('shippingAddress'))
                                   : {};
// 获取本地存储的支付方式
const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
                                 ? JSON.parse(localStorage.getItem('paymentMethod'))
                                 : '';

const initialState = {
    cart: {
        cartItems: cartItemFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;