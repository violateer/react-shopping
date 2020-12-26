import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
await connectDB();

// 插入数据
const insertData = async () => {
    try {
        // 清空数据库中的样本数据
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
        
        // 插入数据
        const createdUsers = await User.insertMany(users);
        
        const adminUserId = createdUsers[0]._id;
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUserId };
        });
        await Product.insertMany(sampleProducts);
        
        console.log('样本数据插入成功'.green.inverse);
        process.exit(0);
    } catch (e) {
        console.log(`Error：${e}`.red.inverse);
        process.exit(1);
    }
};

// 销毁数据
const destroyData = async () => {
    try {
        // 清空数据库中的样本数据
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
        
        console.log('样本数据销毁成功'.green.inverse);
        process.exit(0);
    } catch (e) {
        console.log(`Error：${e}`.red.inverse);
        process.exit(1);
    }
};

// 判断命令行执行的函数
if (process.argv[2] === '-d') {
    await destroyData();
} else {
    await insertData();
}