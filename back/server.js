const express = require('express');
const products = require('./data/products');

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('服务器正在运行');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(product => product._id === req.params.id);
    res.json(product);
});

app.listen(port, () => console.log(`服务器已经在${port}端口运行...`));