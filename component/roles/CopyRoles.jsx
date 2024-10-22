import React, { useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Space, Alert } from "antd";
import ParentRoles from "./ParentRoles";

export default function CopyRoles({ children, record, onCopy, existingKeys }) {
  const [open, setOpen] = useState(false);

  const [parentId, setParentId] = useState(record.parentId || "");
  const [authorityId, setAuthorityId] = useState(record.key || "");
  //   const [oldAuthorityId, setOldAuthorityId] = useState(record.key || "");
  const [authorityName, setAuthorityName] = useState(record.name || "");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (existingKeys.includes(authorityId)) {
      <Alert message="拷贝失败，存在相同id" type="error" />;

      //   onClose();

      return; // Prevent further execution if the ID already exists
    }

    const copyRecord = {
      key: Number(authorityId),
      oldAuthorityId: Number(record.key),
      parentId: Number(parentId),
      authorityId: Number(authorityId),
      authorityName: authorityName,
    };

    // Trigger the update function
    await onCopy(copyRecord);

    // Close the drawer
    onClose();
  };

  const onValuesChange = (changedValues, allValues) => {
    if (changedValues.parentId !== undefined) {
      setParentId(changedValues.parentId);
    }
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
        title="拷贝角色"
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
        <Form
          layout="vertical"
          initialValues={{
            parentId: record.parentId || "",
            authorityId: record.key || "",
            authorityName: record.name || "",
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
                <ParentRoles
                  value={parentId}
                  onChange={(value) => setParentId(value)}
                />
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
                <Input
                  value={authorityId}
                  onChange={(e) => setAuthorityId(e.target.value)}
                />
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
                <Input
                  value={authorityName}
                  onChange={(e) => setAuthorityName(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
