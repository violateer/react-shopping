import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckOutSteps from '../components/CheckOutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
    const [paymentMethod, setPaymentMethod] = useState('微信');
    const dispatch = useDispatch();
    
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    
    if (!shippingAddress) {
        history.push('/shipping');
    }
    
    // 提交表单
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    };
    
    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3/>
            <h1>支付方式</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>选择支付方式</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='微信' id='wechat' name='paymentMethod' value='微信' checked
                                    onChange={e => setPaymentMethod(e.target.value)}></Form.Check>
                        <Form.Check type='radio' label='PayPal' id='PayPal' name='paymentMethod' value='PayPal'
                                    onChange={e => setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    继续下一步
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;