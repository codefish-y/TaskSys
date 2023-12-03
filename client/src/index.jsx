import React from 'react';
import ReactDOM from 'react-dom/client';
import DashBoard from './page/DashBoard';
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom'; // 使用 BrowserRouter
import ProjectList from './page/ProjectList';
import PrivateRoute from './route/PrivateRoute';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <Router>
      {/* 在这里包裹你的应用程序组件 */}
      <Routes>
        <Route path='/' element={<DashBoard />} />
        <Route path="/projects" element={<PrivateRoute element={<ProjectList />} />} />
        {/* 其他路由规则 */}
      </Routes>
    </Router>
  </React.StrictMode>
);
