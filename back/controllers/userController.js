import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

/**
 * @desc 用户身份验证 & 获取token
 * @route POST /api/user/login
 * @access 公开
 */
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    // 根据email查询用户
    const user = await User.findOne({ email });
    // 验证查询到的用户密码是否匹配
    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('邮箱或密码无效');
    }
});