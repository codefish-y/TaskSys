import React, { useState } from 'react';
import NavBar from './NavBar';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default function DashBoard() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

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

  const handleConfirm = async () => {
    try {

        console.log(formData)
        // 发送注册请求
        const response = await axios.post('http://localhost:3001/auth/register', {
          UserName: formData.username,
          UserPWD: formData.password,
          Email: formData.email,
        });
    
        // 注册成功
        console.log('注册成功：', response.data);
        // 关闭模态框
        handleCloseModal();
      } catch (error) {
        // 注册失败
        console.error('注册失败：', error.message);
      }

    // 关闭模态框
    handleCloseModal();
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <NavBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ marginBottom: '20px', fontSize: '24px' }}>Welcome!</div>
        <div style={{ display: 'flex' }}>
          <button className="btn btn-primary" onClick={handleShowModal} style={{ marginRight: '10px' }}>注册</button>
          <button className="btn btn-primary">登录</button>
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
    </div>
  );
}
