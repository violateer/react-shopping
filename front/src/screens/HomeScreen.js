import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const dispatch = useDispatch();
    
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;
    
    useEffect(() => {
        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);
    
    return (
        <>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <h1>最新产品</h1>
                    <Row>
                        {products.map((product) => (
                            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    );
};

export default HomeScreen;
