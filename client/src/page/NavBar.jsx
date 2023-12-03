import React, { useState, useEffect } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../index.css";
import cat from "./cat.jpg";
import "./NavBar.css"; // 新增样式文件

export default function NavBar() {

  // 使用状态管理用户登录状态和名字
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('xiaoyu'); // 默认名字，你可以根据实际情况修改



  const navigate = useNavigate();

  const handleNavLinkClick = (event) => {
    // 阻止默认导航行为
    event.preventDefault();

    // 获取认证令牌
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      // 如果存在认证令牌，表示已登录，执行正常导航
      navigate('/projects');
    } else {
      // 如果不存在认证令牌，表示未登录，显示登录提示或跳转到登录页面
      toast.error('还未登录'); // 这里可以替换为其他提示方式或跳转到登录页面的逻辑
    }
  };



    useEffect(() => {
      // 检查本地存储或其他方式是否存在用户登录状态
      const savedToken = localStorage.getItem('authToken');
      
      if (savedToken) {
        // 如果存在，设置用户已登录
        setLoggedIn(true);
        
        // 从存储中获取用户名（这里是示例，你需要根据实际情况获取）
        const savedUserName = localStorage.getItem('userName');
        if (savedUserName) {
          setUserName(savedUserName);
        }
      }
    }, []); // 依赖为空数组，表示只在组件挂载时运行一次

  return (
    <div className="sidebar d-flex bg-dark flex-column" style={{ height: 800, width: 200 }}>
      {/* 头像和名字 */}
      <div className="user-profile text-center m-4" style={{ height: 200 }}>
      <div className="d-flex flex-column align-items-center">
        <img src={cat} alt="User Avatar" style={{ height: 120, width: 120, borderRadius: '50%' }} />
        <div className="mt-3">
        <p className="username fs-5 fw-bold">
            {isLoggedIn ? `你好，${userName}` : '请登录'}
          </p>
        </div>
      </div>
    </div>

      {/* 导航列表 */}
      <ul className="nav flex-column mt-4">
        <li className="nav-item m-2">
          {/* 使用虚拟的 href 属性，同时添加样式类名来模拟按钮样式 */}
          <NavLink to="/projects" className="nav-link button-link" onClick={handleNavLinkClick}>
            项目列表
          </NavLink>
        </li>
        <li className="nav-item m-2">
          <a className="nav-link button-link" href="#">
            任务看板
          </a>
        </li>
        <li className="nav-item m-2">
          <a className="nav-link button-link" href="#">
            系统通知
          </a>
        </li>
        <li className="nav-item m-2">
          <a className="nav-link button-link" href="#">
            系统日志
          </a>
        </li>
        <li className="nav-item m-2">
          <a className="nav-link button-link" href="#">
            个人资料
          </a>
        </li>
      </ul>
    </div>
  );
}
