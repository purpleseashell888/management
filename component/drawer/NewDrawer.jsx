import React, { useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
const { Option } = Select;

export default function NewDrawer({ children }) {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <a type="primary" onClick={showDrawer}>
        {children}
      </a>
      <Drawer
        title="新增菜单"
        width={1025}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={onClose} type="primary">
              确定
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={30}>
            <Col span={16}>
              <Form.Item
                name="component"
                label="文件路径"
                rules={[
                  {
                    required: true,
                    message: "Please enter",
                  },
                ]}
              >
                <Input placeholder="Please enter path" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="title"
                label="展示名称"
                rules={[
                  {
                    required: true,
                    message: "Please enter url",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col span={8}>
              <Form.Item
                name="route"
                label="路由Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter",
                  },
                ]}
              >
                <Input placeholder="唯一英文字符串" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="path"
                label="路由Path"
                rules={[
                  {
                    required: true,
                    message: "Please enter",
                  },
                ]}
              >
                <Input placeholder="建议只在后方拼接参数" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="hidden"
                label="是否隐藏"
                rules={[
                  {
                    required: true,
                    message: "Please enter url",
                  },
                ]}
              >
                <Select placeholder="否">
                  <Option value="false">否</Option>
                  <Option value="true">是</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col span={8}>
              <Form.Item
                name="parentId"
                label="父节点ID"
                rules={[
                  {
                    required: true,
                    message: "Please select an owner",
                  },
                ]}
              >
                <Select placeholder="官方网站">
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="icon"
                label="图标"
                rules={[
                  {
                    required: true,
                    message: "Please select an owner",
                  },
                ]}
              >
                <Select placeholder="请选择">
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="sort"
                label="排序标记"
                rules={[
                  {
                    required: true,
                    message: "Please choose the type",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col span={8}>
              <Form.Item
                name="menu"
                label="高亮菜单"
                rules={[
                  {
                    required: true,
                    message: "Please select an owner",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="alive"
                label="KeepAlive"
                rules={[
                  {
                    required: true,
                    message: "Please select an owner",
                  },
                ]}
              >
                <Select placeholder="否">
                  <Option value="false">否</Option>
                  <Option value="true">是</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="tab"
                label="CloseTab"
                rules={[
                  {
                    required: true,
                    message: "Please choose the type",
                  },
                ]}
              >
                <Select placeholder="否">
                  <Option value="false">否</Option>
                  <Option value="true">是</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col span={8}>
              <Form.Item
                name="page"
                label="是否为基础页面"
                rules={[
                  {
                    required: true,
                    message: "Please select an owner",
                  },
                ]}
              >
                <Select placeholder="否">
                  <Option value="false">否</Option>
                  <Option value="true">是</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              ></Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
