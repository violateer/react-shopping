import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [province, setProvince] = useState(shippingAddress.province);
    
    const dispatch = useDispatch();
    
    // 提交表单
    const submitHandler = (e) => {
        e.preventDefault();
        // 派发 action
        dispatch(saveShippingAddress({
            address, city, postalCode, province
        }));
        // 跳转
        history.push('/payment');
    };
    
    return (
        <FormContainer>
            <CheckOutSteps step1  step2/>
            <h1>收货地址</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>地址：</Form.Label>
                    <Form.Control type='text' placeholder='请输入详细地址' value={address}
                                  onChange={e => setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>地区：</Form.Label>
                    <Form.Control type='text' placeholder='请输入所在地区' value={city}
                                  onChange={e => setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>邮政编码：</Form.Label>
                    <Form.Control type='text' placeholder='请输入邮政编码' value={postalCode}
                                  onChange={e => setPostalCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='province'>
                    <Form.Label>省份：</Form.Label>
                    <Form.Control type='text' placeholder='请输入所在省份' value={province}
                                  onChange={e => setProvince(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    继续下一步
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;