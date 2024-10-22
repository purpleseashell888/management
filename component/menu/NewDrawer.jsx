import React, { useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Checkbox,
} from "antd";
import NewParams from "./NewParams";
import NewButton from "./NewButton";

const { Option } = Select;

export default function NewDrawer({ children, title }) {
  const [open, setOpen] = useState(false);
  const [isDisabled, setDisabled] = useState(true); // State for route name input disabled

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  //If the checkbox is checked (true), !e.target.checked evaluates to false,
  // and setDisabled(false) is called, enabling the input field.
  // If the checkbox is unchecked (false), !e.target.checked evaluates to true,
  // and setDisabled(true) is called, disabling the input field.
  const handleCheckboxChange = (e) => {
    setDisabled(!e.target.checked);
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
                label={
                  <span>
                    <span style={{ color: "red" }}>*</span> 文件路径
                  </span>
                }
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
                label={
                  <span>
                    <span style={{ color: "red" }}>*</span> 展示名称
                  </span>
                }
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
                label={
                  <span>
                    <span style={{ color: "red" }}>*</span> 路由Name
                  </span>
                }
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
                label={
                  <span>
                    <span style={{ color: "red" }}>*</span> 路由Path
                    <Checkbox className="mx-3" onChange={handleCheckboxChange}>
                      添加参数
                    </Checkbox>
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Please enter",
                  },
                ]}
              >
                <Input
                  placeholder="建议只在后方拼接参数"
                  disabled={isDisabled}
                />
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
                <Select placeholder={title} disabled>
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
        </Form>
        <NewParams />
        <NewButton />
      </Drawer>
    </>
  );
}
