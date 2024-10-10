import React, { useRef, useState, useContext } from "react";
import { MenuContext } from "@/context/MenuContext";
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
  Cascader,
} from "antd";
import NewButton from "./NewButton";
import NewParams from "./NewParams";
import ParentTree from "./ParentTree";
const { Option } = Select;

export default function EditDrawer({ children, record, onUpdate }) {
  const [open, setOpen] = useState(false);
  const { triggerUpdate } = useContext(MenuContext); // Get triggerUpdate from context

  const [isDisabled, setDisabled] = useState(true); // State for route name input disabled

  const [path, setPath] = useState(record.path || "");
  const [component, setComponent] = useState(record.component || "");
  const [title, setTitle] = useState(record.title || "");
  const [route, setRoute] = useState(record.route || "");
  const [hidden, setHidden] = useState(record.hidden || "");
  const [parentId, setParentId] = useState(record.parentId || "");
  const [icon, setIcon] = useState(record.icon || "");
  const [sort, setSort] = useState(record.sort || "");
  const [menu, setMenu] = useState(record.menu || "");
  const [page, setPage] = useState(record.page || "");
  const [alive, setAlive] = useState(record.alive || "");
  const [closeTab, setCloseTab] = useState(record.closeTab || "");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    // Collect values from the inputs
    const updatedRecord = {
      ...record,
      itemId: record.key,
      path: String(path),
      component: String(component),
      title: String(title),
      route: String(route),
      hidden: hidden === "true",
      parentId: parentId,
      icon: icon,
      sort: sort,
      menu: menu,
      alive: alive === "true",
      closeTab: closeTab === "true",
    };
    // console.log(hidden);

    // Trigger the update function
    await onUpdate(updatedRecord);

    // Trigger a re-fetch of the menu data
    triggerUpdate();

    // Close the drawer
    onClose();
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
        title="编辑菜单"
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
            <Button onClick={handleSave} type="primary">
              确定
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark initialValues={record}>
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
                <Input
                  value={component}
                  onChange={(e) => setComponent(e.target.value)}
                />
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                <Input
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="path"
                label={
                  <span>
                    <span style={{ color: "red" }}>*</span> 路由Path
                    {/* <Checkbox className="mx-3" onChange={handleCheckboxChange}> */}
                    <Checkbox className="mx-3">添加参数</Checkbox>
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Please enter",
                  },
                ]}
              >
                {/* <Input disabled={isDisabled} /> */}
                <Input
                  value={path}
                  // ref={pathRef}
                  onChange={(e) => setPath(e.target.value)}
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
                <Select value={hidden} onChange={(value) => setHidden(value)}>
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
                {/* <Select
                  value={parentId}
                  onChange={(value) => setParentId(value)}
                >
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select> */}
                <ParentTree name={title} />
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
                <Select value={icon} onChange={(value) => setIcon(value)}>
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
                <Input
                  value={sort}
                  // ref={pathRef}
                  onChange={(e) => setSort(e.target.value)}
                />
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
                <Input value={menu} onChange={(e) => setMenu(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="alive"
                label="keepAlive"
                rules={[
                  {
                    required: true,
                    message: "Please select an owner",
                  },
                ]}
              >
                <Select value={alive} onChange={(value) => setAlive(value)}>
                  <Option value="false">否</Option>
                  <Option value="true">是</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="closeTab"
                label="closeTab"
                rules={[
                  {
                    required: true,
                    message: "Please choose the type",
                  },
                ]}
              >
                <Select
                  value={closeTab}
                  onChange={(value) => setCloseTab(value)}
                >
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
                <Select value={page} onChange={(value) => setPage(value)}>
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
