// routes/projects.js

const express = require('express');
const router = express.Router();
const Project = require('../models/project'); // 你的模型文件路径

// 获取项目列表
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll(); // 使用Sequelize的findAll方法查询所有项目
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
