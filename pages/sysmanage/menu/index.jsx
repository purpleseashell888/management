import React, { useMemo } from "react";
import { Table } from "antd";
import {
  PlusOutlined,
  NodeIndexOutlined,
  SunOutlined,
  ProfileOutlined,
  TruckOutlined,
  BookOutlined,
  MenuUnfoldOutlined,
  GiftOutlined,
  UpSquareOutlined,
  VerticalAlignTopOutlined,
  CopyOutlined,
  ShopOutlined,
  ReadOutlined,
  FolderOutlined,
  ToolOutlined,
  RocketOutlined,
  PieChartOutlined,
  MailOutlined,
  TabletOutlined,
  ScheduleOutlined,
  IdcardOutlined,
  LaptopOutlined,
  EditOutlined,
  DeleteOutlined,
  HomeOutlined,
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { useMenu } from "@/lib/menu/useMenu";
import NewDrawer from "@/component/drawer/NewDrawer";
import EditDrawer from "@/component/drawer/EditDrawer";
import DeleteDrawer from "@/component/drawer/DeleteDrawer";

// Define a mapping between icon names and Ant Design icon components
const iconMapping = {
  "customer-gva": <HomeOutlined />,
  odometer: <DashboardOutlined />,
  user: <UserOutlined />,
  avatar: <IdcardOutlined />,
  tickets: <ScheduleOutlined />,
  platform: <LaptopOutlined />,
  coordinate: <TeamOutlined />,
  notebook: <TabletOutlined />,
  "pie-chart": <PieChartOutlined />,
  message: <MailOutlined />,
  tools: <ToolOutlined />,
  "magic-stick": <CopyOutlined />,
  folder: <FolderOutlined />,
  cpu: <RocketOutlined />,
  operation: <TruckOutlined />,
  reading: <ReadOutlined />,
  cherry: <NodeIndexOutlined />,
  management: <MenuUnfoldOutlined />,
  shop: <ShopOutlined />,
  box: <GiftOutlined />,
  files: <BookOutlined />,
  upload: <VerticalAlignTopOutlined />,
  "upload-filled": <UpSquareOutlined />,
  cloudy: <SunOutlined />,
  "info-filled": <ProfileOutlined />,
};

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
        {iconMapping[iconName]} {/* Render the icon */}
        <span>{iconName}</span> {/* Display the icon name */}
      </div>
    ), // Render the icon based on the mapping
  },
  {
    title: "路由Name",
    width: 150,
    dataIndex: "route",
    key: "route",
  },
  {
    title: "路由Path",
    dataIndex: "path",
    key: "path",
    width: 150,
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
    render: () => (
      <div className="flex ">
        <div className="flex p-2">
          <div className="px-1">
            <PlusOutlined />
          </div>
          <NewDrawer>添加子菜单</NewDrawer>
        </div>
        <div className="flex p-2">
          <div className="px-1">
            <EditOutlined />
          </div>
          <EditDrawer>编辑</EditDrawer>
        </div>
        <div className="flex p-2">
          <div className="px-1">
            <DeleteOutlined />
          </div>
          <DeleteDrawer>删除</DeleteDrawer>
        </div>
      </div>
    ),
  },
];

const handleData = (data) => {
  const processItem = (item) => {
    // Create the cell object for the current item
    let cell = {
      key: item.ID,
      title: item.meta.title,
      icon: item.meta.icon,
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

    return cell;
  };

  // Process the root data array
  const processedData = (data ?? []).map(processItem);
  // console.log(processedData);
  return processedData;
};

export default function Menu() {
  const { menu, error } = useMenu();
  // console.log(menu);

  let data2 = useMemo(() => {
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
      dataSource={data2}
      expandable={{
        indentSize: 20,
        // defaultExpandAllRows: false, // Optionally control initial expanded state
        expandIconColumnIndex: 0, // Ensure the expand icon is in the first column
        childrenColumnName: "children", // Explicitly define the children key
      }}
      rowKey={data2.key}
      scroll={{
        x: 1500,
      }}
      size="small"
    />
  );
}
