import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    
    return (
        <>
            {loading ? <h1>Loading...</h1> : error ? <h3>{error}</h3> : (
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
            )
            }
        </>
    );
};

export default HomeScreen;
