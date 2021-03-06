import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deleteProduct, listProducts, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Paginate from '../components/Paginate';

const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();
    
    const productList = useSelector(state => state.productList);
    const { loading, error, products, pages, page } = productList;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    const productDelete = useSelector(state => state.productDelete);
    const { loading: deleteLoading, error: deleteError, success: deleteSuccess } = productDelete;
    
    const productCreate = useSelector(state => state.productCreate);
    const {
        loading: createLoading,
        error: createError,
        success: createSuccess,
        product: createdProduct
    } = productCreate;
    
    useEffect(() => {
        // 重置创建产品的state
        dispatch({ type: PRODUCT_CREATE_RESET });
        
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login');
        }
        if (createSuccess) {
            history.push(`/admin/product/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts('', pageNumber));
        }
    }, [dispatch, userInfo, history, deleteSuccess, createSuccess, createdProduct, pageNumber]);
    
    // 删除
    const deleteHandler = (id) => {
        if (window.confirm('Sure to delete?')) {
            dispatch(deleteProduct(id));
        }
    };
    
    // 创建产品
    const createProductHandler = () => {
        dispatch(createProduct());
    };
    
    return (
        <>
            <Row>
                <Col><h1>用户列表</h1></Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>添加产品</Button>
                </Col>
            </Row>
            {createLoading && <Loader/>}
            {createError && <Message variant='danger'>{createError}</Message>}
            {deleteLoading && <Loader/>}
            {deleteError && <Message variant='danger'>{deleteError}</Message>}
            {loading ? <Loader/>
                     : error ? <Message variant='danger'>{error}</Message>
                             : (
                           <>
                               <Table striped bordered hover responsive className='table-sm'>
                                   <thead>
                                   <tr>
                                       <th>ID</th>
                                       <th>产品名称</th>
                                       <th>价格</th>
                                       <th>类型</th>
                                       <th>品牌</th>
                                       <th></th>
                                   </tr>
                                   </thead>
                                   <tbody>
                                   {
                                       products.map(product => (
                                           <tr key={product._id}>
                                               <td>{product._id}</td>
                                               <td>{product.name}</td>
                                               <td>{product.price}</td>
                                               <td>{product.category}</td>
                                               <td>{product.brand}</td>
                                               <td>
                                                   <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                       <Button variant='light' className='btn-sm'>
                                                           <i className='fas fa-edit'></i>
                                                       </Button>
                                                   </LinkContainer>
                                                   <Button variant='danger' className='btn-sm'
                                                           onClick={() => deleteHandler(product._id)}>
                                                       <i className='fas fa-trash'></i>
                                                   </Button>
                                               </td>
                                           </tr>))
                                   }
                                   </tbody>
                               </Table>
                               <Paginate pages={pages} page={page} isAdmin={true}/>
                           </>
                       )}
        </>
    );
};

export default ProductListScreen;