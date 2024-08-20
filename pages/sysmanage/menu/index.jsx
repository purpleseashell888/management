import React, { useState } from "react";
import { Table } from "antd";

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
    width: 150,
  },
  {
    title: "操作",
    width: 100,
    key: "operation",
    fixed: "right",
    render: () => <a>action</a>,
  },
];

export default function Menu() {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const toggleRow = (record) => {
    const key = record.key; // Extract the unique key of the row
    if (expandedRowKeys.includes(key)) {
      // If expanded, remove the key to collapse the row
      setExpandedRowKeys(expandedRowKeys.filter((k) => k !== key));
    } else {
      // If not expanded, add the key to expand the row
      setExpandedRowKeys([...expandedRowKeys, key]);
    }
  };
  console.log(expandedRowKeys);

  const expandIconAsTable = ({ record }) => {
    if (!record.children) {
      return <span style={{ paddingLeft: "16px" }} />; // No icon, just an empty space for alignment
    }

    return (
      <span
        onClick={() => toggleRow(record)}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        {expandedRowKeys.includes(record.key) ? "-" : "+"}
      </span>
    );
  };
  return (
    <Table
      columns={columns}
      dataSource={data}
      expandable={{
        expandedRowRender: (record) => (
          <Table
            columns={columns}
            dataSource={record.children}
            pagination={false}
            rowKey={(row) => row.key}
            // showHeader={false}
          />
        ),
        expandIcon: expandIconAsTable,
        expandedRowKeys: expandedRowKeys, // Pass the expandedRowKeys state
        onExpand: (expanded, record) => toggleRow(record), // Handle row expansion
      }}
      rowKey={(record) => record.key}
    />
  );
}
