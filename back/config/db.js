import mongoose from 'mongoose';

// 连接数据库
const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    const mongoDB = process.env.MONGO_DB;
    const user = process.env.MONGO_USER;
    const pass = process.env.MONGO_PASS;
    try {
        const conn = await mongoose.connect(uri, {
            auth: { 'authSource': mongoDB },
            user,
            pass,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log(`MongoDB已连接到${conn.connection.host}`);
    } catch (e) {
        console.log(`ERROR：${e.message}`);
        process.exit(1);
    }
};

export default connectDB;