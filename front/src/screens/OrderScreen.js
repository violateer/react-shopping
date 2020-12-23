import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Image, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { getOrderDetails } from '../actions/orderActions';
import Loader from '../components/Loader';

const OrderScreen = ({ match }) => {
    const orderId = match.params.id;
    const dispatch = useDispatch();
    
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    
    useEffect(() => {
        if (!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, order, orderId]);
    
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
                                  </ListGroup>
                              </Card>
                          </Col>
                      </Row>
                  </>
    );
};

export default OrderScreen;