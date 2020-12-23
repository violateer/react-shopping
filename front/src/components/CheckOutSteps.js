import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? <LinkContainer to='/login'><Nav.Link>登录</Nav.Link></LinkContainer>
                       : <Nav.Link disabled>登录</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step2 ? <LinkContainer to='/shipping'><Nav.Link>收货地址</Nav.Link></LinkContainer>
                       : <Nav.Link disabled>收货地址</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step3 ? <LinkContainer to='/payment'><Nav.Link>支付</Nav.Link></LinkContainer>
                       : <Nav.Link disabled>支付</Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step4 ? <LinkContainer to='/placeorder'><Nav.Link>确定下单</Nav.Link></LinkContainer>
                       : <Nav.Link disabled>确定下单</Nav.Link>}
            </Nav.Item>
        </Nav>
    );
};

export default CheckOutSteps;