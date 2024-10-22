import React, { useMemo, useState, useEffect } from "react";
import { Table, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMenu } from "@/lib/menu/useMenu";
import NewDrawer from "@/component/menu/NewDrawer";
import EditDrawer from "@/component/menu/EditDrawer";
import DeleteDrawer from "@/component/menu/DeleteDrawer";
import updateMenuItem from "@/lib/menu/updateMenuItem";
import Login from "@/pages/login";
import deleteMenu from "@/lib/menu/deleteMenu";
import { IconPark } from "jsonlee-ui-react";

const handleData = (data) => {
  const processItem = (item) => {
    // Create the cell object for the current item
    let cell = {
      key: item.ID,
      title: item.meta.title,
      icon: item.meta.icon,
      // keepAlive: item.meta.keepAlive,
      // closeTab: item.meta.closeTab,
      activeName: item.meta.activeName,
      route: item.path,
      path: item.path,
      parentId: item.parentId,
      sort: item.sort,
      component: item.component,
    };

    // Recursively process children if they exist and are not null
    if (item.children && item.children.length > 0) {
      cell.children = item.children.map(processItem);
    }

    if (item.hidden === false) {
      cell.hidden = "显示";
    } else {
      cell.hidden = "隐藏";
    }

    if (item.meta.closeTab === false) {
      cell.closeTab = "是";
    } else {
      cell.closeTab = "否";
    }

    if (item.meta.keepAlive === false) {
      cell.keepAlive = "否";
    } else {
      cell.keepAlive = "是";
    }

    return cell;
  };

  // Process the root data array
  const processedData = (data ?? []).map(processItem);

  return processedData;
};

export default function Menu() {
  const { menu, error, refetch } = useMenu();

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
      dataIndex: "title",
      key: "title",
    },
    {
      title: "图标",
      width: 200,
      dataIndex: "icon",
      key: "icon",
      render: (iconName) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IconPark name={iconName} />
          <span>{iconName}</span> {/* Display the icon name */}
        </div>
      ), // Render the icon based on the mapping
    },
    {
      title: "路由Name",
      width: 200,
      dataIndex: "route",
      key: "route",
    },
    {
      title: "路由Path",
      dataIndex: "path",
      key: "path",
      width: 200,
    },
    {
      title: "是否隐藏",
      width: 100,
      dataIndex: "hidden",
      key: "hidden",
    },
    {
      title: "父节点",
      width: 100,
      dataIndex: "parentId",
      key: "parentId",
    },
    {
      title: "排序",
      width: 100,
      dataIndex: "sort",
      key: "sort",
    },
    {
      title: "文件路径",
      dataIndex: "component",
      key: "component",
      width: 350,
    },
    {
      title: "操作",
      width: 280,
      key: "operation",
      fixed: "right",
      render: (text, record) => (
        <div className="flex ">
          <div className="flex p-2">
            <div className="px-1">
              <PlusOutlined />
            </div>
            {/* Pass the title value to the NewDrawer component */}
            <NewDrawer title={record.title}>添加子菜单</NewDrawer>
          </div>
          <div className="flex p-2">
            <div className="px-1">
              <EditOutlined />
            </div>
            <EditDrawer record={record} onUpdate={handleUpdate}>
              编辑
            </EditDrawer>
          </div>
          <div className="flex p-2">
            <div className="px-1">
              <DeleteOutlined />
            </div>
            <DeleteDrawer record={record} onDelete={handleDelete}>
              删除
            </DeleteDrawer>
          </div>
        </div>
      ),
    },
  ];

  // Function to handle updating a menu item
  const handleUpdate = async (updatedItem) => {
    await updateMenuItem(updatedItem); // You'll need to implement this API call
    refetch(); // Re-fetch the menu data
  };

  const handleDelete = async (itemId) => {
    // Make an API call to update the menu item
    await deleteMenu(itemId); // You'll need to implement this API call
    refetch(); // Re-fetch the menu data
  };

  const data = useMemo(() => {
    return handleData(menu);
  }, [menu]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!menu) {
    return <div>Loading...</div>;
  }

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
      rowKey="key"
      scroll={{
        x: 1500,
      }}
      size="small"
    />
  );
}
