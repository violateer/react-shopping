import express from 'express';
import multer from 'multer';
import path from 'path';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// 创建磁盘存储引擎
const storage = multer.diskStorage({
    // 存储路径
    destination (req, file, cb) {
        cb(null, 'uploads/');
    },
    // 文件存储前重命名
    filename (req, file, ch) {
        cb(null, `${file.filename}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// 验证文件类型
const checkFileType = (file, cb) => {
    // 定义允许的文件扩展名
    const fileTypes = /jpg|jpeg|png/;
    // 判断文件扩展名
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // 验证资源的而媒体类型
    const mimeType = fileTypes.test(file.mimeType);
    
    if (extname && mimeType) {
        return cb(null, true);
    } else {
        cb('仅限图片格式为jpg|jpeg|png！');
    }
};

// 文件过滤函数
const fileFilter = (req, file, cb) => {
    checkFileType(file, cb);
};

// 上传文件
const upload = multer({ storage, fileFilter });

// 创建文件上传路由
router.post('/', protect, isAdmin, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});

export default router;