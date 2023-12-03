import React, { useState } from "react";
import NavBar from "./NavBar";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function ProjectList() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // 进行查询逻辑，你可以根据实际需求添加查询功能
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="d-flex " style={{ height: '100vh' }}>
      <NavBar />
      <div className="flex-1 ">
        <Container className="mt-5">
          <Row>
            <Col>
              <h2 className="mb-4">任务列表</h2>
            </Col>
          </Row>
          <Row className=" mb-3">
            <Col sm={8}> {/* 增大 Col 的宽度 */}
              <Form onSubmit={handleSearch} className="d-flex">
                <Form.Group className="mr-2">
                  <Form.Control
                    type="text"
                    placeholder="输入任务名称"
                    style={{ width: "250px", marginLeft: "10px"}} 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mr-2">
                  <Form.Control
                    type="text"
                    placeholder="输入创建者"
                    style={{ width: "250px", marginLeft: "10px" }} 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" style={{ width: "300px", marginLeft: "10px" }}>查询</Button> {/* 使用 style 设置宽度 */}
                <Button type="submit" variant="primary" style={{ width: "300px", marginLeft: "10px" }}>Add</Button> {/* 使用 style 设置宽度 */}
              </Form>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              {/* 这里可以添加任务列表的展示组件，例如一个表格或卡片 */}
              <p>任务列表展示区域</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ProjectList;
