import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import Message from '../components/Message';

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : '1';
    
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    
    // 删除产品
    const removeFromCartHandler = (id) => {
        console.log(id + '已删除');
    };
    
    // 支付
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    };
    
    return (
        <Row>
            <Col md={8}>
                <h1>购物车</h1>
                {cartItems.length === 0
                 ? (<Message>购物车为空 <Link to='/'>返回主页</Link></Message>)
                 : (
                     <ListGroup variant='flush'>
                         {cartItems.map(item => (
                             <ListGroup.Item key={item.product}>
                                 <Row>
                                     <Col md={2}><Image src={item.image} alt={item.name} fluid rounded/></Col>
                                     <Col md={3}><Link to={`/products/${item.product}`}>{item.name}</Link></Col>
                                     <Col md={2}>{item.price}</Col>
                                     <Col md={2}>
                                         <Form.Control as='select' value={item.qty}
                                                       onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                             {[...Array(item.countInStock).keys()].map(i => (
                                                     <option value={i + 1} key={i + 1}>{i + 1}</option>
                                                 )
                                             )}
                                         </Form.Control>
                                     </Col>
                                     <Col md={3}><Button type='button'
                                                         onClick={() => removeFromCartHandler(item.product)}>
                                         <i className='fas fa-trash'></i>
                                     </Button></Col>
                                 </Row>
                             </ListGroup.Item>
                         ))}
                     </ListGroup>
                 )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>共计({cartItems.reduce((acc, item) => acc + item.qty, 0)})个产品</h2>
                            ￥{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}>去支付</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;