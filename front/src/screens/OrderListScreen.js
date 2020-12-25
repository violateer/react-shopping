import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderList } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
        const dispatch = useDispatch();
        
        const orderList = useSelector(state => state.orderList);
        const { loading, error, orders } = orderList;
        
        const userLogin = useSelector(state => state.userLogin);
        const { userInfo } = userLogin;
        
        useEffect(() => {
            if (userInfo && userInfo.isAdmin) {
                dispatch(getOrderList());
            } else {
                history.push('/login');
            }
        }, [dispatch, userInfo, history]);
        
        return (
            <>
                <h1>订单列表</h1>
                {loading ? <Loader/>
                         : error ? <Message variant='danger'>{error}</Message>
                                 : (
                               <Table striped bordered hover responsive className='table-sm'>
                                   <thead>
                                   <tr>
                                       <th>ID</th>
                                       <th>用户</th>
                                       <th>下单日期</th>
                                       <th>总价</th>
                                       <th>支付状态</th>
                                       <th>发货状态</th>
                                       <th></th>
                                   </tr>
                                   </thead>
                                   <tbody>
                                   {
                                       orders.map(order => (
                                           <tr key={order._id}>
                                               <td>{order._id}</td>
                                               <td>{order.user?.name}</td>
                                               <td>{order.createdAt.substring(0, 10)}</td>
                                               <td>{order.totalPrice}</td>
                                               <td>{order.isPaid ? (order.paidAt.substring(0, 10))
                                                                 : <i className='fas fa-times'
                                                                      style={{ color: 'red' }}></i>}</td>
                                               <td>{order.isDelivered ? (order.deliveredAt.substring(0, 10))
                                                                      : <i className='fas fa-times'
                                                                           style={{ color: 'red' }}></i>}</td>
                                               <td>
                                                   <LinkContainer to={`/order/${order._id}`}>
                                                       <Button variant='light' className='btn-sm'>
                                                           查看订单
                                                       </Button>
                                                   </LinkContainer>
                                               </td>
                                           </tr>))
                                   }
                                   </tbody>
                               </Table>)}
            </>
        );
    }
;

export default OrderListScreen;