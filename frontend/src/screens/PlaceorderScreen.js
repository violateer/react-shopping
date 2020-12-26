import React, { useEffect } from 'react';
import { Form, Button, Row, Col, Image, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckOutSteps from '../components/CheckOutSteps';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';

const PlaceorderScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    
    const { paymentMethod, cartItems, shippingAddress } = cart;
    const { province, city, address, postalCode } = shippingAddress;
    
    const dispatch = useDispatch();
    
    // 设置金额保留后两位
    const addDecimals = num => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };
    
    // 计算价格
    const itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    const shippingPrice = addDecimals(itemsPrice > 5000 ? 0 : 20);
    const totalPrice = addDecimals(Number(itemsPrice) + Number(shippingPrice));
    
    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error } = orderCreate;
    
    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
            dispatch({ type: USER_DETAILS_RESET });
        }
    }, [history, success, order, dispatch]);
    
    // 提交订单
    const placeorderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        }));
    };
    
    return (
        <>
            <CheckOutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>收货地址</h2>
                            <strong>收件人地址：</strong>
                            {province}-{city}-{address}-{postalCode}
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <h2>支付方式 </h2>
                            <strong>支付方式：</strong>
                            {paymentMethod}
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <h2>产品订单</h2>
                            {cartItems.length === 0 ? <Message variant='danger'>购物车为空</Message>
                                                    : (<ListGroup variant='flush'>
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}><Image src={item.image} alt={item.name} fluid
                                                                   rounded/></Col>
                                                <Col>
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty}件 X ￥{item.price} = ￥{item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>)}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>订单详情</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>产品总价</Col>
                                    <Col>￥{itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>运费</Col>
                                    <Col>￥{shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>订单总价</Col>
                                    <Col>￥{totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' onClick={placeorderHandler}
                                        disabled={cartItems.length === 0}>提交订单</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceorderScreen;