import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserDetails } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { getMyOrderList } from '../actions/orderActions';

const ProfileScreen = ({ location, history }) => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [message, setMessage] = useState(null);
        
        const dispatch = useDispatch();
        const userDetails = useSelector(state => state.userDetails);
        const { loading, error, user } = userDetails;
        
        const userLogin = useSelector(state => state.userLogin);
        const { userInfo } = userLogin;
        
        const userUpdateProfile = useSelector(state => state.userUpdateProfile);
        const { success } = userUpdateProfile;
        
        const orderListMy = useSelector(state => state.orderListMy);
        const { loading: ordersLoading, error: ordersError, orders } = orderListMy;
        
        useEffect(() => {
            if (!userInfo) {
                history.push('/login');
                return;
            }
            
            if (!user.name || success) {
                // 重置用户信息
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails('profile'));
                
                // 订单
                dispatch(getMyOrderList());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }, [dispatch, history, userInfo, user, success]);
        
        // 表单提交-更新用户信息
        const submitHandler = (e) => {
            e.preventDefault();
            setMessage(null);
            // 派发updateProfile
            dispatch(updateUserDetails({
                id: user._id,
                name, email, password
            }));
        };
        
        return (
            <Row>
                <Col md={3}>
                    <h2>个人资料</h2>
                    {success && <Message variant='success'>更新成功</Message>}
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader/>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>用户名：</Form.Label>
                            <Form.Control type='text' placeholder='请输入用户名' value={name}
                                          onChange={e => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>邮箱地址：</Form.Label>
                            <Form.Control type='email' placeholder='请输入邮箱' value={email}
                                          onChange={e => setEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>密码：</Form.Label>
                            <Form.Control type='password' placeholder='请输入密码' value={password}
                                          onChange={e => setPassword(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>确认密码：</Form.Label>
                            <Form.Control type='password' placeholder='请确认密码' value={confirmPassword}
                                          onChange={e => setConfirmPassword(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>更改资料</Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h2>我的订单</h2>
                    {ordersLoading ? <Loader/>
                                   : ordersError ? <Message variant='danger'>{ordersError}</Message>
                                                 : (<Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>下单日期</th>
                                    <th>金额</th>
                                    <th>支付状态</th>
                                    <th>发货状态</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>￥{order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10)
                                                          : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10)
                                                               : <i className='fas fa-times'
                                                                    style={{ color: 'red' }}></i>}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>订单详情</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>)}
                </Col>
            </Row>
        );
    }
;

export default ProfileScreen;