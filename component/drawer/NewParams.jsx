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

export default function NewParams() {
  const [data, setData] = useState([]);

  const handleAdd = () => {
    // Add a new row with empty values
    setData([
      ...data, // Spread existing data to keep current rows
      {
        key: `${data.length}`, // Use length as unique key
        type: "query", // Initialize the type field with "query" as the default value
        pkey: "", // Initialize the type field as an empty string
        value: "",
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
      title: "参数类型",
      dataIndex: "type",
      key: "type",
      width: "100px",
      render: (text, record, index) => (
        // Render a Select component in the cell, bound to the type field
        <Select
          value={text} // Set the value of the select to the current value of the field
          onChange={(value) => handleInputChange(index, "type", value)} // Handle select changes
          placeholder="query"
          style={{ width: "100%" }} // Optional: to match the width of the input field
        >
          <Option value="query">query</Option>
          <Option value="params">params</Option>
        </Select>
      ),
    },
    {
      title: "参数key",
      dataIndex: "pkey",
      key: "pkey",
      width: "100px",
      render: (text, record, index) => (
        // Render an Input component in the cell, bound to the key field
        <Input
          value={text}
          onChange={(e) => handleInputChange(index, "pkey", e.target.value)}
        />
      ),
    },
    {
      title: "参数值",
      dataIndex: "value",
      key: "value",
      width: "200px",
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(index, "value", e.target.value)}
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
    <>
      <Button type="primary" className="p-3" onClick={handleAdd}>
        {" "}
        <FormOutlined />
        新增菜单参数
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
    </>
  );
}
