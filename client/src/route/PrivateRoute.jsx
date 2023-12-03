// PrivateRoute.jsx
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ element }) => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    // 用户未登录时显示通知
    toast.error('请先登录');
  }

  return authToken ? element : <Navigate to="/" />;

};

export default PrivateRoute;
