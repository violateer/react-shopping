import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    
    const dispatch = useDispatch();
    
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    
    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: updateLoading, error: updateError, success: updateSuccess } = userUpdate;
    
    useEffect(() => {
        if (updateSuccess) {
            // 更新成功则清空更新信息的state并返回edit页面
            dispatch({ type: USER_UPDATE_RESET });
            history.push('/admin/userlist');
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [dispatch, user, userId, updateSuccess, history]);
    
    // 表单提交
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({
            _id: userId,
            name,
            email,
            isAdmin
        }));
    };
    
    return (
        <FormContainer>
            <Link to='/admin/userlist' className='btn btn-dark my-3'>返回上一页</Link>
            <h1>编辑用户信息</h1>
            {updateLoading && <Loader/>}
            {updateError && <Message variant='danger'>{updateError}</Message>}
            {
                loading ? <Loader/>
                        : error ? <Message variant='danger'>{error}</Message>
                                : (
                              <Form onSubmit={submitHandler}>
                                  <Form.Group controlId='name'>
                                      <Form.Label>用户名：</Form.Label>
                                      <Form.Control type='name' placeholder='请输入用户名' value={name}
                                                    onChange={e => setName(e.target.value)}>
                                      </Form.Control>
                                  </Form.Group>
                                  <Form.Group controlId='email'>
                                      <Form.Label>邮箱地址：</Form.Label>
                                      <Form.Control type='email' placeholder='请输入邮箱' value={email}
                                                    onChange={e => setEmail(e.target.value)}>
                                      </Form.Control>
                                  </Form.Group>
                                  <Form.Group controlId='isAdmin'>
                                      <Form.Check type='checkbox' label='IsAdmin' checked={isAdmin}
                                                  onChange={e => setIsAdmin(e.target.checked)}>
                                      </Form.Check>
                                  </Form.Group>
                                  <Button type='submit' variant='primary'>更新信息</Button>
                              </Form>
                          )
            }
        </FormContainer>
    );
}
;

export default UserEditScreen;