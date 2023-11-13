const express = require("express");
const app = express();

    //服务器监听端口3001
    app.listen(3001,()=>{
        console.log("server is live in 3001");
    })