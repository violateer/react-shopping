import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

/**
 * @desc 用户注册
 * @route POST /api/users
 * @access 公开
 */
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    // 用户已存在
    if (userExists) {
        res.status(400);
        throw new Error('用户已注册');
    }
    // 注册用户
    const user = await User.create({ name, email, password });
    if (user) {
        res.status(201);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('无效的用户信息');
    }
});

/**
 * @desc 用户身份验证 & 获取token
 * @route POST /api/users/login
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

/**
 * @desc 获取用户信息
 * @route GET /api/users/profile
 * @access 私密-带token
 */
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('用户不存在');
    }
});

/**
 * @desc 更新用户信息
 * @route POST /api/users/profile
 * @access 私密-带token
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    
    if (user) {
        // 获取需要更新的资料
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updateUser = await user.save();
        // 返回更新后的用户信息
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id)
        });
    } else {
        res.status(404);
        throw new Error('用户不存在');
    }
});

/**
 * @desc 获取所有用户信息
 * @route GET /api/users
 * @access 私密-带token-仅限管理员
 */
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

/**
 * @desc 删除注册用户
 * @route DELETE /api/users/:id
 * @access 私密-带token-仅限管理员
 */
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        const result = await user.remove();
        res.json({ message: '用户已删除' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * @desc 根据id获取用户信息
 * @route GET /api/users/:id
 * @access 私密-带token-仅限管理员
 */
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * @desc 根据id更新用户信息
 * @route PUT /api/users/:id
 * @access 私密-带token-仅限管理员
 */
export const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        // 获取需要更新的资料
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
        const updateUser = await user.save();
        // 返回更新后的用户信息
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('用户不存在');
    }
});