import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
await connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('服务器正在运行');
});

app.use('/api/products', productRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => console.log(`服务器已经在${process.env.NODE_ENV}模式下${port}端口运行...`.magenta.bold));