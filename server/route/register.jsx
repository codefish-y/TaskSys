const express = require('express');
const router = express.Router();
const { User } = require('../models'); // 根据实际文件路径调整

// 注册路由
router.post('/register', async (req, res) => {
  try {
    // 获取用户输入
    const post = req.body;

    // 将用户信息插入数据库
    const newUser = await User.create(post);
    res.json(post)

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
