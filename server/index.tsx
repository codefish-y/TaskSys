const express = require("express");
const app = express();
const db = require('./models')
const register = require('./route/register.jsx')
const login = require('./route/login.jsx')
const cors = require('cors')

// 使用cors做跨域处理（放在最前面）
app.use(cors());

// 解析json数据
app.use(express.json());

// 实现注册路由
app.use('/', register);
// 实现登录路由
app.use("/",login);

db.sequelize.sync().then(()=>{

    // 服务器监听端口3001
    app.listen(3001, () => {
        console.log("server is live in 3001");
    });
})

