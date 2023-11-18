import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import cat from "./cat.jpg"

export default function NavBar() {
    return (
        <div className="sidebar d-flex bg-dark flex-column" style={{ height: 800, width:200}}>
          {/* 头像和名字 */}
          <div className="user-profile text-center m-4" style={{height:200}}>
            <div className="d-flex align-items-start">
              <img src={cat} alt="User Avatar" style={{height:80,width:120}} />
            </div>
              <div className="mt-4">
                <p className='username'>xiaoyu</p>
              </div>
          </div>
      
          {/* 导航列表 */}
          <ul className="nav flex-column mt-4">
            <li className="nav-item m-2">
              <a className="nav-link active" href="#">
                项目列表
              </a>
            </li>
            <li className="nav-item m-2">
              <a className="nav-link" href="#">
                任务看板
              </a>
            </li>
            <li className="nav-item m-2">
              <a className="nav-link" href="#">
                系统通知
              </a>
            </li>
            <li className="nav-item m-2">
              <a className="nav-link" href="#">
                系统日志
              </a>
            </li>
            <li className="nav-item m-2">
              <a className="nav-link" href="#">
                个人资料
              </a>
            </li>
          </ul>
        </div>
      );
      
}
