import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

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

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => console.log(`服务器已经在${process.env.NODE_ENV}模式下${port}端口运行...`.magenta.bold));