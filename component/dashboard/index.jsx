import React, { useState } from "react";
import {
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const routes = [
  { key: "/", label: "首页", roles: ["admin", "user"] },
  //   { key: "/welcome", label: "首页", roles: ["admin", "user"] },
  {
    key: "/sysmanage",
    label: "系统管理",
    roles: ["admin"],
    children: [
      {
        key: "/sysmanage/roles",
        label: "角色管理",
        roles: ["admin"],
      },
      { key: "/sysmanage/menu", label: "菜单管理", roles: ["admin"] },
      {
        key: "/sysmanage/apimanage",
        label: "api管理",
        roles: ["admin"],
      },
    ],
  },
  {
    key: "/systools",
    label: "系统工具",
    roles: ["admin"],
    children: [
      { key: "/systools/mode", label: "模版配置", roles: ["admin"] },
      { key: "/systools/table", label: "表格模版", roles: ["admin"] },
    ],
  },
  { key: "/about", label: "关于项目", roles: ["admin", "user"] },
];

// const routes = [
//   { path: "/", breadcrumbname: "首页", roles: ["admin", "user"] },
//   { path: "/welcome", breadcrumbname: "首页", roles: ["admin", "user"] },
//   {
//     path: "/sysmanage",
//     breadcrumbname: "系统管理",
//     roles: ["admin"],
//     children: [
//       {
//         path: "/sysmanage/roles",
//         breadcrumbname: "角色管理",
//         roles: ["admin"],
//       },
//       { path: "/sysmanage/menu", breadcrumbname: "菜单管理", roles: ["admin"] },
//       {
//         path: "/sysmanage/apimanage",
//         breadcrumbname: "api管理",
//         roles: ["admin"],
//       },
//     ],
//   },
//   {
//     path: "/systools",
//     breadcrumbname: "系统工具",
//     roles: ["admin"],
//     children: [
//       { path: "/systools/mode", breadcrumbname: "模版配置", roles: ["admin"] },
//       { path: "/systools/table", breadcrumbname: "表格模版", roles: ["admin"] },
//     ],
//   },
//   { path: "/about", breadcrumbname: "关于项目", roles: ["admin", "user"] },
// ];

const items = [
  getItem("首页", "/welcome", <PieChartOutlined />),
  getItem("系统管理", "/sysmanage", <UserOutlined />, [
    getItem("角色管理", "/sysmanage/roles"),
    getItem("菜单管理", "/sysmanage/menu"),
    getItem("API管理", "/sysmanage/apimanage"),
  ]),
  getItem("系统工具", "/systools", <TeamOutlined />, [
    getItem("模版配置", "/systools/mode"),
    getItem("表格模版", "/systools/table"),
  ]),
  getItem("关于项目", "/about", <FileOutlined />),
];

const flatten = (arr = []) => {
  return arr.flatMap((item) => {
    if (item.children) {
      return [item, ...flatten(item.children)];
    }
    return [item];
  });
};

const flattenRoutes = flatten(routes);

const findParent = (path, arr, res = []) => {
  // Start of the outer loop, which iterates over each item in the array
  outer: for (const item of arr) {
    // Check if the current item has children
    if (item.children) {
      // Start of the inner loop, which iterates over each child of the current item
      for (const subItem of item.children) {
        // Check if the path of the current child matches the target path
        if (subItem.key === path) {
          // If a match is found, add the current item (parent) to the result array
          res.push(item);
          // Break out of both loops as we have found the parent
          break outer;
        }
        // If the current child has its own children, we need to search deeper
        if (subItem.children) {
          // Create a new result array that includes the current item
          const newRes = [...res];
          newRes.push(item);
          // Recursively call findParent to search within the current child's children
          return findParent(path, subItem.children, newRes);
        }
      }
    }
  }
  // Return the result array, which will either be empty or contain the parent(s)
  return res;
};

export default function Dashboard({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const { data: session } = useSession();

  const defaultSelectedKeys = [pathname];

  const defaultOpenKeys = findParent(pathname, routes).map((item) => item.key);
  const [openKeys, setOpenKeys] = useState(defaultOpenKeys);

  if (pathname === "/welcome") {
    router.push("/");
  }

  const onClick = (e) => {
    router.push(e.key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const splicingData = (arr) => {
    const items = flattenRoutes.filter((item) => {
      const name = item.key.split("/").pop();
      return arr.includes(name);
    });
    return items; // 返回结果数组
  };

  const handleOpenChange = (_openKeys) => {
    setOpenKeys([_openKeys.pop()]);
  };

  //   const filteredItems = routes.filter((item) => {
  //     if (item.children) {
  //       item.children = item.children.filter(
  //         (subItem) =>
  //           session?.user.roles && subItem.roles.includes(session?.user.roles)
  //       );
  //       return (
  //         // item.children.length > 0 &&
  //         session?.user.roles && item.roles.includes(session?.user.roles)
  //       );
  //     }
  //     return session?.user.roles && item.roles.includes(session?.user.roles);
  //   });

  const filteredItems = routes.map((item) => {
    let newItem = { ...item }; // Create a copy of the item to avoid mutating the original

    if (newItem.children) {
      // Filter children based on user's roles
      newItem.children = newItem.children.filter(
        (subItem) =>
          session?.user.roles && subItem.roles.includes(session?.user.roles)
      );

      // Set children to undefined if no children remain after filtering
      if (newItem.children.length === 0) {
        newItem.children = undefined;
      }
    }

    // Return the item if the user has access based on their roles
    if (session?.user.roles && newItem.roles.includes(session?.user.roles)) {
      return newItem;
    }

    return null; // Filter out items that don't match
  });

  console.log(session?.user.roles);

  console.log(filteredItems);

  console.log(items);

  return (
    <div>
      {" "}
      {pathname === "/login" ? (
        children
      ) : (
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            theme="light"
          >
            <div className="items-center flex justify-center h-[60px] ">
              <span className="text-2xl">后台管理</span>
            </div>
            <div className="demo-logo-vertical" />
            <Menu
              theme="light"
              defaultSelectedKeys={defaultSelectedKeys}
              // defaultOpenKeys={defaultOpenKeys}
              openKeys={openKeys}
              mode="inline"
              items={filteredItems}
              onClick={onClick}
              onOpenChange={handleOpenChange}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            />
            <Content
              style={{
                margin: "0 16px",
              }}
            >
              <Breadcrumb
                style={{
                  margin: "16px 0",
                }}
                items={splicingData(pathname.split("/")).map((item) => {
                  return {
                    // title: <Link href={item}>{breadcrumbNameMap[item]}</Link>,
                    title: <Link href={item.key}>{item.label}</Link>,
                  };
                })}
              ></Breadcrumb>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {children}
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      )}
    </div>
  );
}
