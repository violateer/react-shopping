import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, updateProduct } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import axios from 'axios';

const ProductEditScreen = ({ match, history }) => {
        const productId = match.params.id;
        
        const [name, setName] = useState('');
        const [price, setPrice] = useState(0);
        const [image, setImage] = useState('');
        const [brand, setBrand] = useState('');
        const [category, setCategory] = useState('');
        const [countInStock, setCountInStock] = useState(0);
        const [description, setDescription] = useState(0);
        const [uploading, setUploading] = useState(false);
        
        const dispatch = useDispatch();
        
        const productDetails = useSelector(state => state.productDetails);
        const { loading, error, product } = productDetails;
        
        const productUpdate = useSelector(state => state.productUpdate);
        const { loading: updateLoading, error: updateError, success: updateSuccess } = productUpdate;
        
        const userLogin = useSelector(state => state.userLogin);
        const { userInfo } = userLogin;
        
        useEffect(() => {
            if (updateSuccess) {
                // 更新成功则重置更新信息并跳转
                dispatch({ type: PRODUCT_UPDATE_RESET });
                dispatch(listProductDetails(productId));
                history.push('/admin/productlist');
            } else {
                if (!product.name || product._id !== productId) {
                    dispatch(listProductDetails(productId));
                } else {
                    setName(product.name);
                    setPrice(product.price);
                    setImage(product.image);
                    setBrand(product.brand);
                    setCategory(product.category);
                    setCountInStock(product.countInStock);
                    setDescription(product.description);
                }
            }
        }, [dispatch, product, productId, history, updateSuccess]);
        
        // 表单提交
        const submitHandler = (e) => {
            e.preventDefault();
            // 派发更新
            dispatch(updateProduct({ _id: productId, name, price, image, brand, category, countInStock, description }));
        };
        
        // 图片上传
        const uploadFileHandler = async (e) => {
            // 获取用户选择上传的文件
            const file = e.target.files[0];
            // 实例化formData表单数据对象
            const formData = new FormData();
            formData.append('image', file);
            setUploading(true);
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multerpart/form-data',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                };
                const { data } = await axios.post('/api/upload', formData, config);
                setImage(data);
                setUploading(false);
            } catch (err) {
                console.log(err);
                setUploading(false);
            }
        };
        
        return (
            <FormContainer>
                <Link to='/admin/productlist' className='btn btn-dark my-3'>返回上一页</Link>
                <h1>编辑产品信息</h1>
                {updateLoading && <Loader/>}
                {updateError && <Message variant='danger'>{updateError}</Message>}
                {
                    loading ? <Loader/>
                            : error ? <Message variant='danger'>{error}</Message>
                                    : (
                                  <Form onSubmit={submitHandler}>
                                      <Form.Group controlId='name'>
                                          <Form.Label>产品名称：</Form.Label>
                                          <Form.Control type='name' placeholder='请输入产品名称' value={name}
                                                        onChange={e => setName(e.target.value)}>
                                          </Form.Control>
                                      </Form.Group>
                                      <Form.Group controlId='price'>
                                          <Form.Label>产品价格：</Form.Label>
                                          <Form.Control type='number' placeholder='请输入产品价格' value={price}
                                                        onChange={e => setPrice(e.target.value)}>
                                          </Form.Control>
                                      </Form.Group>
                                      <Form.Group controlId='image'>
                                          <Form.Label>产品图片：</Form.Label>
                                          <Form.Control type='text' placeholder='请输入产品图片路径' value={image}
                                                        onChange={e => setImage(e.target.value)}>
                                          </Form.Control>
                                          <Form.File id='image-file' label='选择上传图片' custom
                                                     onChange={uploadFileHandler}></Form.File>
                                          {uploading && <Loader/>}
                                      </Form.Group>
                                      <Form.Group controlId='brand'>
                                          <Form.Label>产品品牌：</Form.Label>
                                          <Form.Control type='text' placeholder='请输入产品品牌' value={brand}
                                                        onChange={e => setBrand(e.target.value)}>
                                          </Form.Control>
                                      </Form.Group>
                                      <Form.Group controlId='category'>
                                          <Form.Label>产品分类：</Form.Label>
                                          <Form.Control type='text' placeholder='请输入产品分类' value={category}
                                                        onChange={e => setCategory(e.target.value)}>
                                          </Form.Control>
                                      </Form.Group>
                                      <Form.Group controlId='countInStock'>
                                          <Form.Label>产品库存：</Form.Label>
                                          <Form.Control type='number' placeholder='请输入产品库存' value={countInStock}
                                                        onChange={e => setCategory(e.target.value)}>
                                          </Form.Control>
                                      </Form.Group>
                                      <Form.Group controlId='description'>
                                          <Form.Label>产品价绍：</Form.Label>
                                          <Form.Control type='text' placeholder='请输入产品价绍' value={description}
                                                        onChange={e => setDescription(e.target.value)}>
                                          </Form.Control>
                                      </Form.Group>
                                      <Button type='submit' variant='primary'>更新信息</Button>
                                  </Form>
                              )
                }
            </FormContainer>
        );
    }
;

export default ProductEditScreen;