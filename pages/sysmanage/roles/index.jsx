import React, { useMemo } from "react";
import { Table } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useAuthority, deleteAuthority } from "@/lib/authority/useAuthority";
import DeleteRoles from "@/component/roles/DeleteRoles";
import EditRoles from "@/component/roles/EditRoles";
import updateAuthority from "@/lib/authority/updateAuthority";
import CopyRoles from "@/component/roles/CopyRoles";
import copyAuthority from "@/lib/authority/copyAuthority";

const handleData = (data) => {
  const processItem = (item) => {
    // Create the cell object for the current item
    let cell = {
      key: String(item.authorityId),
      name: item.authorityName,
      parentId: String(item.parentId),
    };

    // Recursively process children if they exist and are not null
    if (item.children && item.children.length > 0) {
      cell.children = item.children.map(processItem);
    }

    return cell;
  };

  // Process the root data array
  const processedData = (data ?? []).map(processItem);

  return processedData;
};

export default function Roles() {
  const { authority, error, refetch } = useAuthority();
  console.log(authority);

  const columns = [
    {
      title: "",
      key: "expand",
      width: 5,
    },
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
      render: (text, record) => (
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
            <CopyRoles
              record={record}
              onCopy={handleCopy}
              existingKeys={data.map((item) => item.key)} // Pass existing keys here
            >
              拷贝
            </CopyRoles>
          </div>
          <div className="flex p-2">
            <div className="px-1">
              <EditOutlined />
            </div>
            <EditRoles record={record} onUpdate={handleUpdate}>
              编辑
            </EditRoles>
          </div>
          <div className="flex p-2">
            <div className="px-1">
              <DeleteOutlined />
            </div>
            <DeleteRoles record={record} onDelete={handleDelete}>
              删除
            </DeleteRoles>
          </div>
        </div>
      ),
    },
  ];
  const handleCopy = async (authorityItem) => {
    await copyAuthority(authorityItem); // You'll need to implement this API call
    refetch(); // Re-fetch the menu data
  };

  const handleUpdate = async (authorityItem) => {
    await updateAuthority(authorityItem); // You'll need to implement this API call
    refetch(); // Re-fetch the menu data
  };

  const handleDelete = async (authorityItem) => {
    await deleteAuthority(authorityItem); // You'll need to implement this API call
    refetch(); // Re-fetch the menu data
  };

  const data = useMemo(() => {
    // console.log(authority);

    return handleData(authority);
  }, [authority]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <Table columns={columns} dataSource={data} size="small" />;
}
