import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductsCarousel from '../components/ProductsCarousel';

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;
    
    const dispatch = useDispatch();
    
    const productList = useSelector(state => state.productList);
    const { loading, error, products, pages, page } = productList;
    
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);
    
    return (
        <>
            {!keyword && <ProductsCarousel/>}
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
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                </>
            )}
        </>
    );
}
;

export default HomeScreen;
