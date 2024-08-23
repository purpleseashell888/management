import React from "react";
import { Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    children: [
      {
        key: "1.1",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
      },
      {
        key: "1.2",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
      },
    ],
  },
  {
    key: "2",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    children: [
      {
        key: "2.1",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
      },
      {
        key: "2.2",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
      },
    ],
  },
];

const columns = [
  {
    title: "",
    key: "expand",
    width: 50,
  },
  {
    title: "ID",
    width: 100,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "展示名称",
    width: 100,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "图标",
    width: 100,
    dataIndex: "icon",
    key: "icon",
  },
  {
    title: "路由Name",
    width: 150,
    dataIndex: "route-name",
    key: "route-name",
  },
  {
    title: "路由Path",
    dataIndex: "route-path",
    key: "route-path",
    width: 150,
  },
  {
    title: "是否隐藏",
    width: 150,
    dataIndex: "hide",
    key: "hide",
  },
  {
    title: "父节点",
    width: 100,
    dataIndex: "node",
    key: "node",
  },
  {
    title: "排序",
    width: 150,
    dataIndex: "order",
    key: "order",
  },
  {
    title: "文件路径",
    dataIndex: "address",
    key: "7",
    width: 200,
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
            <PlusOutlined />
          </div>
          添加子菜单
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

export default function Menu() {
  return (
    <Table
      columns={columns}
      dataSource={data}
      expandable={{
        indentSize: 20,
        // defaultExpandAllRows: false, // Optionally control initial expanded state
        expandIconColumnIndex: 0, // Ensure the expand icon is in the first column
        childrenColumnName: "children", // Explicitly define the children key
      }}
      rowKey={(record) => record.key}
      scroll={{
        x: 1500,
      }}
      size="small"
    />
  );
}
