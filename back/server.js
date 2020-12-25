import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import axios from 'axios';

dotenv.config();
await connectDB();

const app = express();
const port = process.env.PORT || 5000;

// 解析请求体
app.use(express.json());

app.get('/', (req, res) => {
    res.send('服务器正在运行');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// 获取支付的status状态码
app.get('/status', (req, res) => {
    axios.get('https://www.thenewstep.cn/pay/logs/log.txt').then(response => {
        res.json({ status: response.data });
    });
});

// 获取paypal的clientId
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

// 设置upload为静态文件夹
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => console.log(`服务器已经在${process.env.NODE_ENV}模式下${port}端口运行...`.magenta.bold));