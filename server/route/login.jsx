const express = require('express');
const router = express.Router();
const { User, Sequelize } = require('../models'); // 导入User表
const { Op } = Sequelize; // 引入Sequelize的Op对象
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 用于生成 JWT 的密钥
const secretKey = 'xiaoyu';

// 生成 JWT 的函数
function generateAuthToken(user) {
  // 在这个例子中，我们将用户的一些信息作为 payload 存储在 JWT 中
  const payload = {
    userId: user.UserId,
    userName: user.UserName,
    email: user.Email,
    // 其他用户信息
  };

  // 使用 sign 方法生成 JWT，其中第一个参数是 payload，第二个参数是密钥，第三个参数是一些选项（可选）
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // 这里设置了过期时间为1小时

  return token;
}

// 登录路由
router.post('/login', async (req, res) => {
  try {
    // 获取用户输入
    const { usernameOrEmail, password } = req.body;

    // 检查请求体中是否包含必要的字段
    if (!usernameOrEmail || !password) {
      return res.status(400).json({
        message: '请输入用户名（或邮箱）和密码',
      });
    }

    // 查询数据库，检查用户是否存在
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { UserName: usernameOrEmail },
          { Email: usernameOrEmail },
        ],
      },
    });

    // 如果用户不存在，返回错误响应
    if (!user) {
      return res.status(404).json({
        message: '用户不存在',
      });
    }

    // 验证密码是否匹配
    const passwordMatch = await bcrypt.compare(password, user.UserPWD);

    // 如果密码不匹配，返回错误响应
    if (!passwordMatch) {
      return res.status(401).json({
        message: '用户名或密码不正确',
      });
    }

    // 如果用户存在且密码匹配，生成 JWT 并返回成功响应
    const authToken = generateAuthToken(user);

    res.status(200).json({
      message: '登录成功',
      user: {
        UserId: user.UserId,
        UserName: user.UserName,
        Email: user.Email,
        authToken: authToken, // 将生成的 JWT 返回给前端
      },
    });
  } catch (error) {
    console.error('登录失败：', error.message);
    // 返回失败响应
    res.status(500).json({
      message: '登录失败',
      error: error.message,
    });
  }
});

module.exports = router;
