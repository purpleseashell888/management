import React, { useState } from "react";
import { Button, Table, Input, Select } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select; // Destructure Option from Select for easy access

const empty = {
  emptyText: "暂无数据",
};

const components = {
  header: {
    cell: (props) => (
      <th {...props} style={{ backgroundColor: "white" }}>
        {props.children}
      </th>
    ),
  },
};

export default function NewButton() {
  const [data, setData] = useState([]);

  const handleAdd = () => {
    // Add a new row with empty values
    setData([
      ...data, // Spread existing data to keep current rows
      {
        key: `${data.length}`, // Use length as unique key
        name: "", // Initialize the type field as an empty string
        note: "",
      },
    ]);
  };

  // Handle input change for each field
  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleDelete = (index) => {
    // Filter out the row at the specified index to delete it from the data array
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const columns = [
    {
      title: "按钮名称",
      dataIndex: "name",
      key: "name",
      width: "100px",
      render: (text, record, index) => (
        // Render an Input component in the cell, bound to the key field
        <Input
          value={text}
          onChange={(e) => handleInputChange(index, "name", e.target.value)}
        />
      ),
    },
    {
      title: "备注",
      dataIndex: "note",
      key: "note",
      width: "100px",
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(index, "note", e.target.value)}
        />
      ),
    },
    {
      key: "action",
      width: "200px",
      render: (_, record, index) => (
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(index)}
          danger
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <div className="mt-5">
      <Button type="primary" className="p-3" onClick={handleAdd}>
        {" "}
        <FormOutlined />
        新增可控按钮
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        className="mt-5"
        pagination={false}
        components={components}
        locale={empty}
        rowKey="key" // Assign unique key for each row
      />
    </div>
  );
}
