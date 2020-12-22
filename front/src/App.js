// 引入样式
import { Container } from 'react-bootstrap';
// 路由
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

function App () {
    return (
        <Router>
            <Header/>
            <main className="py-3">
                <Container>
                    <Route path="/" component={HomeScreen} exact/>
                    <Route path="/products/:id" component={ProductScreen}/>
                    <Route path="/cart/:id?" component={CartScreen}/>
                    <Route path="/login" component={LoginScreen}/>
                </Container>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;
