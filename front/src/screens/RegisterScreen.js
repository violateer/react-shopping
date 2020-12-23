import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const RegisterScreen = ({ location, history }) => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [message, setMessage] = useState(null);
        const redirect = location.search ? location.search.split('=')[1] : '/';
        const dispatch = useDispatch();
        const userRegister = useSelector(state => state.userRegister);
        const { loading, error, userInfo } = userRegister;
        
        console.log(userInfo);
        
        useEffect(() => {
            if (userInfo) {
                history.push(redirect);
            }
        }, [history, userInfo, redirect]);
        
        // 表单提交
        const submitHandler = (e) => {
            e.preventDefault();
            // 派发register
            setMessage(null);
            if (password !== confirmPassword) {
                setMessage('两次密码不一致');
                return;
            }
            dispatch(register(name, email, password));
        };
        
        return (
            <FormContainer>
                <h1>注册</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>用户名：</Form.Label>
                        <Form.Control type='name' placeholder='请输入用户名' value={name}
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
                    <Button type='submit' variant='primary'>注册</Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                        已有账号？<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>去登录</Link>
                    </Col>
                </Row>
            </FormContainer>
        );
    }
;

export default RegisterScreen;