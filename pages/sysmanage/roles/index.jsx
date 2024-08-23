import React from "react";
import { Table } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const data = [
  {
    key: "1",
    name: "普通用户",
  },
  {
    key: "2",
    name: "测试用户",
  },
];

const columns = [
  {
    title: "角色ID",
    width: 250,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "角色名称",
    width: 250,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "操作",
    width: 280,
    key: "operation",
    fixed: "right",
    render: () => (
      <div className="flex ">
        <div className="flex p-2">
          <div className="px-1">
            <SettingOutlined />
          </div>
          设置权限
        </div>
        <div className="flex p-2">
          <div className="px-1">
            <PlusOutlined />
          </div>
          新增子角色
        </div>
        <div className="flex p-2">
          <div className="px-1">
            <CopyOutlined />
          </div>
          拷贝
        </div>
        <div className="flex p-2">
          <div className="px-1">
            <EditOutlined />
          </div>
          编辑
        </div>
        <div className="flex p-2">
          <div className="px-1">
            <DeleteOutlined />
          </div>
          删除
        </div>
      </div>
    ),
  },
];

export default function Roles() {
  return <Table columns={columns} dataSource={data} size="small" />;
}
