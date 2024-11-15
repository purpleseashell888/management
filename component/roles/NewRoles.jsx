import React, { useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Space, Alert } from "antd";
import ParentRoles from "./ParentRoles";

export default function NewRoles({ children, record, onCreate }) {
  const [open, setOpen] = useState(false);

  //   const [parentId, setParentId] = useState(record.key || "");

  const [authorityId, setAuthorityId] = useState(record.key || "");
  const [authorityName, setAuthorityName] = useState(record.name || "");

  const [error, setError] = useState(""); // State for handling errors

  const showDrawer = () => {
    setOpen(true);
    setError(""); // Reset error when opening the drawer
  };

  const onClose = () => {
    setOpen(false);
    setError(""); // Reset error when opening the drawer
  };

  const handleSave = async () => {
    const copyRecord = {
      parentId: Number(record.key),
      authorityId: Number(authorityId),
      authorityName: authorityName,
    };

    // Trigger the update function
    await onCreate(copyRecord);

    // Close the drawer
    onClose();
  };

  const onValuesChange = (changedValues, allValues) => {
    if (changedValues.authorityId !== undefined) {
      setAuthorityId(changedValues.authorityId);
    }
    if (changedValues.authorityName !== undefined) {
      setAuthorityName(changedValues.authorityName);
    }
  };

  return (
    <>
      <a type="primary" onClick={showDrawer}>
        {children}
      </a>
      <Drawer
        title="新增角色"
        width={512}
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
        {/* Show Alert when there's an error */}
        {error && <Alert message={error} type="error" showIcon />}
        <Form
          style={{
            margin: "10px 0",
          }}
          layout="vertical"
          initialValues={{
            parentId: record.key || "",
            authorityId: 0,
            authorityName: "",
          }}
          onValuesChange={onValuesChange}
        >
          <Row gutter={30}>
            <Col span={16}>
              <Form.Item
                name="parentId"
                label={<span>父级角色</span>}
                rules={[
                  {
                    required: true,
                    message: "Please enter",
                  },
                ]}
              >
                <ParentRoles disabled={true} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col span={16}>
              <Form.Item
                name="authorityId"
                label={<span>角色ID</span>}
                rules={[
                  {
                    required: true,
                    message: "Please enter",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col span={16}>
              <Form.Item
                name="authorityName"
                label={<span>角色姓名</span>}
                rules={[
                  {
                    required: true,
                    message: "Please enter",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
