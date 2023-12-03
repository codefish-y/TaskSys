const express = require('express');
const router = express.Router();
const { User } = require('../models'); // 导入User表
const bcrypt = require("bcrypt");

// 注册路由 /register
router.post('/register', async (req, res) => {
  try {
    // 获取用户输入
    const { UserName, UserPWD, Email } = req.body;

    // 使用bcrypt对密码进行加密
    const hashedPassword = await bcrypt.hash(UserPWD, 10);

    // 将用户信息插入数据库 密码使用hash加密后的数据
    const newUser = await User.create({
      UserName,
      UserPWD:hashedPassword,
      Email,
      
    });
    // res.json(newUser);

    // 返回成功响应
    res.status(201).json({
      message: '注册成功',
      user: newUser,
    });
  } catch (error) {
    console.error('注册失败：', error.message);
    // 返回失败响应
    res.status(500).json({
      message: '注册失败',
      error: error.message,
    });
  }
});

module.exports = router;
