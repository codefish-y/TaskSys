import React, { useState,useEffect} from 'react';
import NavBar from './NavBar';
// import { Routes, Route } from 'react-router-dom';
// import ProjectList from './ProjectList'; // 确保路径和文件名正确
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


export default function DashBoard() {
  // 路由跳转
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  // 注册表单数据
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  // 登录表单数据
  const [loginFormData, setLoginFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  // 登录状态管理
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('未登录'); // 或其他默认值

  // useEffect用于在组件渲染后执行副作用，比如发送请求
  useEffect(() => {
    // 检查本地存储或其他持久化方式是否存在登录状态
    const savedToken = localStorage.getItem('authToken');

    if (savedToken) {
      // 如果存在，将登录状态设置为true
      setLoggedIn(true);
    }
  }, []); // 空数组作为依赖，表示只在组件挂载时运行一次

// 注册modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    // 清空表单数据
    setFormData({
      username: '',
      password: '',
      email: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 登录modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    // 清空登录表单数据
    setLoginFormData({
      usernameOrEmail: '',
      password: '',
    });
  };

  // 注册实现
  const handleConfirm = async () => {
    try {

        console.log(formData)
        // 发送注册请求
        await axios.post('http://localhost:3001/register', {
          UserName: formData.username,
          UserPWD: formData.password,
          Email: formData.email,
        });
    
        // 注册成功
        toast.success('注册成功', { autoClose: 3000 }); // 显示成功通知，并在2秒后自动关闭
        // 关闭模态框
        handleCloseModal();
      } catch (error) {
        // 注册失败
        toast.error(`注册失败：${error.message}`, { autoClose: 3000 }); 

      }

    // 关闭模态框
    handleCloseModal();
  };

  // 登录实现

  const handleLogin = async () => {
    try {
      console.log(loginFormData);
      // 发送登录请求
      const response = await axios.post('http://localhost:3001/login', {
        // 传递登录所需的数据，例如：usernameOrEmail 和 password
        // 根据后端接口的要求传递数据
        usernameOrEmail: loginFormData.usernameOrEmail,
        password: loginFormData.password,
      });

      // 登录成功
      toast.success('登录成功', { autoClose: 3000 });

      // 将登录状态设置为true
      setLoggedIn(true);
      //立即更新用户名
      setUserName(response.data.user.UserName);
      // 存储认证令牌到本地存储，以便在刷新页面后保持登录状态
      localStorage.setItem('authToken', response.data.user.authToken);
      //保存用户名
      localStorage.setItem('userName', response.data.user.UserName);


      // 关闭登录模态框
      handleCloseLoginModal();
      // 使用navigate进行页面导航
      navigate('/projects');
    } catch (error) {
      // 登录失败
      if (error.response) {
        // 如果是响应错误，提取出自定义的错误消息
        toast.error(`登录失败：${error.response.data.message}`, { autoClose: 3000 }); 
      } else {
        // 如果是其他类型的错误，显示通用的错误消息
        toast.error('登录失败：发生了未知错误', { autoClose: 3000 });
      }
    }

    // 关闭登录模态框
    handleCloseLoginModal();
  };

  return (
    
    <div style={{ display: 'flex', height: '100vh' }}>
      <ToastContainer />
      <NavBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ marginBottom: '20px', fontSize: '24px' }}>Welcome!</div>
        <div style={{ display: 'flex' }}>
        <button className="btn btn-primary mx-2" onClick={handleShowModal}>注册</button>
        <button className="btn btn-primary" onClick={handleShowLoginModal}>登录</button>
        </div>
      </div>

      {/* 注册模态框 */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>注册</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>用户名</Form.Label>
              <Form.Control type="text" placeholder="输入用户名" name="username" value={formData.username} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>密码</Form.Label>
              <Form.Control type="password" placeholder="输入密码" name="password" value={formData.password} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>邮箱</Form.Label>
              <Form.Control type="email" placeholder="输入邮箱" name="email" value={formData.email} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            取消
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            确认
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 登录模态框 */}
      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>登录</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsernameOrEmail">
              <Form.Label>用户名或邮箱</Form.Label>
              <Form.Control
                type="text"
                placeholder="输入用户名或邮箱"
                name="usernameOrEmail"
                value={loginFormData.usernameOrEmail}
                onChange={(e) => setLoginFormData((prevData) => ({ ...prevData, usernameOrEmail: e.target.value }))}
              />
            </Form.Group>

            <Form.Group controlId="formLoginPassword">
              <Form.Label>密码</Form.Label>
              <Form.Control
                type="password"
                placeholder="输入密码"
                name="password"
                value={loginFormData.password}
                onChange={(e) => setLoginFormData((prevData) => ({ ...prevData, password: e.target.value }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLoginModal}>
            取消
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            登录
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
