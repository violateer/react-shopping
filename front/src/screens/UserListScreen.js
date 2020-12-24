import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserList } from '../actions/userActions';

const UserListScreen = () => {
        const dispatch = useDispatch();
        const userList = useSelector(state => state.userList);
        const { loading, error, users } = userList;
        
        useEffect(() => {
            dispatch(getUserList());
        }, [dispatch]);
        
        // 删除
        const deleteHandler = (id) => {
            console.log('删除' + id);
        };
        
        return (
            <>
                <h1>用户列表</h1>
                {loading ? <Loader/>
                         : error ? <Message variant='danger'>{error}</Message>
                                 : (
                               <Table striped bordered hover responsive className='table-sm'>
                                   <thead>
                                   <tr>
                                       <th>ID</th>
                                       <th>姓名</th>
                                       <th>邮箱</th>
                                       <th></th>
                                   </tr>
                                   </thead>
                                   <tbody>
                                   {
                                       users.map(user => (
                                           <tr key={user._id}>
                                               <td>{user._id}</td>
                                               <td>{user.name}</td>
                                               <td>{user.email}</td>
                                               <td>{user.isAdmin ? <i className='fas fa-check'
                                                                      style={{ color: 'green' }}></i>
                                                                 : <i className='fas fa-times'
                                                                      style={{ color: 'red' }}></i>}</td>
                                               <td>
                                                   <LinkContainer to={`/user/${user._id}/edit`}>
                                                       <Button variant='light' className='btn-sm'>
                                                           <i className='fas fa-edit'></i>
                                                       </Button>
                                                   </LinkContainer>
                                                   <Button variant='danger' className='btn-sm'
                                                           onClick={() => deleteHandler(user._id)}>
                                                       <i className='fas fa-trash'></i>
                                                   </Button>
                                               </td>
                                           </tr>))
                                   }
                                   </tbody>
                               </Table>)}
            </>
        );
    }
;

export default UserListScreen;