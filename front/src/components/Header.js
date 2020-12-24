import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    // 注销
    const logoutHandler = () => {
        dispatch(logout());
    };
    
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>V商城</Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>购物车
                                </Nav.Link>
                            </LinkContainer>
                            
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='管理' id='adminMenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>用户列表</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>产品列表</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>订单列表</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                            
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>个人信息</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>注销</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                 <LinkContainer to="/login">
                                     <Nav.Link>
                                         <i className="fas fa-user"></i>登录
                                     </Nav.Link>
                                 </LinkContainer>
                             )}
                        
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
