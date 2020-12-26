import React, { useEffect, useState } from 'react';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { createProductReview, listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ history, match }) => {
    const dispatch = useDispatch();
    
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    
    const productCreateReview = useSelector(state => state.productCreateReview);
    const { loading: reviewLoading, error: reviewError, success: reviewSuccess } = productCreateReview;
    
    useEffect(() => {
        if (reviewSuccess) {
            alert('评论成功！');
            setRating(0);
            setComment('');
        }
        if (!product._id || product._id !== match.params.id || reviewSuccess) {
            dispatch(listProductDetails(match.params.id));
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
    }, [dispatch, match, reviewSuccess, product]);
    
    // 添加到购物车事件
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };
    
    // 选择评分
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(match.params.id, { rating, comment }));
    };
    
    return (
        <>
            {loading ? <Loader/>
                     : error ? <Message variant='danger'>{error}</Message>
                             : (<>
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
                        {/*评论区*/}
                        <Row>
                            <Col md={6}>
                                <h2>评论</h2>
                                {product.reviews?.length === 0 && <Message>没有评论</Message>}
                                <ListGroup variant='flush'>
                                    {product.reviews?.map(review => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating}/>
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item>
                                        <h2>添加评论</h2>
                                        {reviewLoading && <Loader/>}
                                        {reviewError && <Message variant='danger'>{reviewError}</Message>}
                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group>
                                                    <Form.Label>评分</Form.Label>
                                                    <Form.Control as='select' value={rating}
                                                                  onChange={e => setRating(e.target.value)}>
                                                        <option value="">选择评分</option>
                                                        <option value="1">1 - 非常不满意</option>
                                                        <option value="2">2 - 不满意</option>
                                                        <option value="3">3 - 一般</option>
                                                        <option value="4">4 - 满意</option>
                                                        <option value="5">5 - 非常满意</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='comment'>
                                                    <Form.Control as='textarea' row='3' value={comment}
                                                                  onChange={e => setComment(e.target.value)}></Form.Control>
                                                </Form.Group>
                                                <Button type='submit' variant='primary'>发表评论</Button>
                                            </Form>
                                        ) : (<Message variant='danger'>请先<Link to='/login'>登录</Link></Message>)}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </>)}
        </>
    );
};

export default ProductScreen;