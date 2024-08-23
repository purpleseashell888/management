import React from "react";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const data = [
  {
    key: "1",
    descriptions: "John Brown",
    group: 32,
    path: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    descriptions: "John Brown",
    group: 32,
    path: "New York No. 1 Lake Park",
  },
];

const columns = [
  {
    title: "ID",
    width: 50,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "API路径",
    width: 100,
    dataIndex: "path",
    key: "path",
  },
  {
    title: "API分组",
    width: 100,
    dataIndex: "group",
    key: "group",
  },
  {
    title: "API简介",
    width: 150,
    dataIndex: "descriptions",
    key: "descriptions",
  },
  {
    title: "请求",
    dataIndex: "request",
    key: "request",
    width: 150,
  },
  {
    title: "操作",
    width: 100,
    key: "operation",
    fixed: "right",
    render: () => (
      <div className="flex ">
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

export default function ApiManage() {
  const total = 10;

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        defaultPageSize: 10,
        pageSizeOptions: [10, 15],

        total: total,
        showTotal: (total) => `共 ${total} 条`,

        defaultCurrent: 1,
        showSizeChanger: true,
        showQuickJumper: true,
        locale: {
          items_per_page: "条 / 页",
          jump_to: "跳至",
          page: "页",
        },
      }}
      size="small"
    />
  );
}
