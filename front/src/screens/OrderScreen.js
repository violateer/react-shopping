import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Image, Card, ListGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import Loader from '../components/Loader';
import axios from 'axios';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import { v4 as uuidv4 } from 'uuid';

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id;
    const dispatch = useDispatch();
    
    // 弹出框状态
    const [show, setShow] = useState(false);
    const [image, setImage] = useState('');
    const [text, setText] = useState('请扫码');
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    
    const orderPay = useSelector(state => state.orderPay);
    const { loading: payLoading, error: payError, success: paySuccess } = orderPay;
    
    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }
        if (!order || order._id !== orderId || paySuccess) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, order, orderId, paySuccess, userInfo, history]);
    
    // 控制弹出框
    const handleClose = () => {
        setShow(false);
    };
    const handlePayment = () => {
        setImage(`https://www.thenewstep.cn/pay/index.php?pid=${order._id}`);
        setShow(true);
        
        // 设置定时器监听支付
        let timer = setInterval(() => {
            // 请求支付status
            axios.get('/status').then(res => {
                if (res.data.status === 0) {
                    setText('请扫码');
                }
                if (res.data.status === 1) {
                    setText('已扫码，请完成支付');
                }
                if (res.data.status === 2) {
                    // 创建支付结果对象
                    const paymentResult = {
                        id: uuidv4(),
                        status: res.data.status,
                        update_time: new Date.now(),
                        email_address: order.user.email
                    };
                    // 更新支付完成的订单
                    dispatch(payOrder(orderId, paymentResult));
                    setText('已支付，请等待发货');
                    setShow(false);
                    clearTimeout(timer);
                }
            });
        }, 1000);
    };
    
    return (
        loading ? <Loader/>
                : error ? <Message variant='danger'>{error}</Message>
                        : <>
                      <h1>订单号：{order._id}</h1>
                      <Row>
                          <Col md={8}>
                              <ListGroup variant='flush'>
                                  <ListGroup.Item>
                                      <h2>收货地址</h2>
                                      <p><strong>收件人地址：</strong></p>
                                      <p><strong>用户名：</strong>{order.user.name}</p>
                                      <p><strong>邮箱：</strong><a
                                          href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                      <p>{order.shippingAddress.province}-
                                          {order.shippingAddress.city}-
                                          {order.shippingAddress.address}-
                                          {order.shippingAddress.postalCode}</p>
                                      {order.isDelivered ? (
                                                             <Message variant='success'>发货时间：{order.deliveredAt}</Message>)
                                                         : (<Message variant='danger'>未发货</Message>)}
                                  </ListGroup.Item>
                        
                                  <ListGroup.Item>
                                      <h2>支付方式 </h2>
                                      <p>
                                          <strong>支付方式：</strong>
                                          {order.paymentMethod}
                                      </p>
                                      {order.isPaid ? (
                                                        <Message variant='success'>支付时间：{order.paidAt}</Message>)
                                                    : (<Message variant='danger'>待支付</Message>)}
                                  </ListGroup.Item>
                        
                                  <ListGroup.Item>
                                      <h2>产品订单</h2>
                                      {order.orderItems.length === 0 ? <Message variant='danger'>购物车为空</Message>
                                                                     : (<ListGroup variant='flush'>
                                              {order.orderItems.map((item, index) => (
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
                                              <Col>￥{order.itemsPrice}</Col>
                                          </Row>
                                      </ListGroup.Item>
                                      <ListGroup.Item>
                                          <Row>
                                              <Col>运费</Col>
                                              <Col>￥{order.shippingPrice}</Col>
                                          </Row>
                                      </ListGroup.Item>
                                      <ListGroup.Item>
                                          <Row>
                                              <Col>订单总价</Col>
                                              <Col>￥{order.totalPrice}</Col>
                                          </Row>
                                      </ListGroup.Item>
                                      <ListGroup.Item>
                                          <Button type='button' className='btn-block' onClick={handlePayment}
                                                  disabled={order.orderItems === 0}>去支付</Button>
                                          {/*弹出框*/}
                                          <Modal show={show} onHide={handleClose}>
                                              <Modal.Header closeButton>
                                                  <Modal.Title>订单号：{order._id}</Modal.Title>
                                              </Modal.Header>
                                              <Modal.Body>
                                                  <p>支付金额：￥{order.totalPrice}</p>
                                                  <p>支付方式：￥{order.paymentMethod}</p>
                                                  <Row>
                                                      <Col md={6} style={{ textAlign: 'center' }}>
                                                          <Image src={image}/>
                                                          <p style={{
                                                              backgroundColor: '#00C800',
                                                              color: '#fff'
                                                          }}>{text}</p>
                                                      </Col>
                                                      <Col>
                                                          <Image src='/images/saoyisao.jpg'/>
                                                      </Col>
                                                  </Row>
                                              </Modal.Body>
                                              <Modal.Footer>
                                                  <Button variant="primary" onClick={handleClose}>
                                                      关闭
                                                  </Button>
                                              </Modal.Footer>
                                          </Modal>
                                      </ListGroup.Item>
                                  </ListGroup>
                              </Card>
                          </Col>
                      </Row>
                  </>
    );
};

export default OrderScreen;