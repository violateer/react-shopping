import React, { useEffect, useState } from 'react';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match]);
    
    // 添加到购物车事件
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };
    
    return (
        <>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Link className='btn btn-dark my-3' to='/'>返回主页</Link>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                                <ListGroup.Item><Rating value={product.rating}
                                                        text={`${product.numReviews}条评论`}/></ListGroup.Item>
                                <ListGroup.Item>价格：￥{product.price}</ListGroup.Item>
                                <ListGroup.Item>描述：{product.description}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>价格：</Col>
                                            <Col><strong>￥{product.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>库存：</Col>
                                            <Col><strong>剩余{product.countInStock}件</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>数量：</Col>
                                            <Col>
                                                {/* 待添加库存为零的处理 */}
                                                {/* CartScreen组件也用到了 */}
                                                <Form.Control as='select' value={qty}
                                                              onChange={e => setQty(e.target.value)}>
                                                    {[...Array(product.countInStock).keys()].map(i => (
                                                            <option value={i + 1} key={i + 1}>{i + 1}</option>
                                                        )
                                                    )}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button onClick={addToCartHandler}
                                                className='btn-block'
                                                type="button"
                                                disabled={!product.countInStock}>添加到购物车</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        
        </>
    );
};

export default ProductScreen;