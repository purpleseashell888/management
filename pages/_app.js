import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";

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

const { Header, Content, Footer, Sider } = Layout;
// const homePath = "/dashboard";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const routes = [
  { path: "/", breadcrumbName: "首页" },
  { path: "/dashboard", breadcrumbName: "首页" },
  {
    path: "/sysmanage",
    breadcrumbName: "系统管理",
    children: [
      { path: "/sysmanage/roles", breadcrumbName: "角色管理" },
      { path: "/sysmanage/menu", breadcrumbName: "菜单管理" },
      { path: "/sysmanage/apimanage", breadcrumbName: "api管理" },
    ],
  },
  {
    path: "/systools",
    breadcrumbName: "系统工具",
    children: [
      { path: "/systools/mode", breadcrumbName: "模版配置" },
      { path: "/systools/table", breadcrumbName: "表格模版" },
    ],
  },
  { path: "/about", breadcrumbName: "关于项目" },
];

const items = [
  getItem("首页", "/dashboard", <PieChartOutlined />),
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

const findParent = (path, arr, res = []) => {
  // Start of the outer loop, which iterates over each item in the array
  outer: for (const item of arr) {
    // Check if the current item has children
    if (item.children) {
      // Start of the inner loop, which iterates over each child of the current item
      for (const subItem of item.children) {
        // Check if the path of the current child matches the target path
        if (subItem.path === path) {
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

const flattenRoutes = flatten(routes);

export default function App({ Component, pageProps }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  const defaultSelectedKeys = [pathname];

  const defaultOpenKeys = findParent(pathname, routes).map((item) => item.path);
  const [openKeys, setOpenKeys] = useState(defaultOpenKeys);

  // if (pathname === "/") {
  //   router.replace(homePath);
  // }

  const onClick = (e) => {
    router.push(e.key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const splicingData = (arr) => {
    // let items = []; // 存储拼接后的路径字符串数组
    // for (let i = 0; i < arr.length; i++) {
    //   // 将当前数组的前i个元素拼接成一个路径，并加入到items数组中
    //   items.push(arr.slice(0, i + 1).join("/"));
    // }
    const items = flattenRoutes.filter((item) => {
      const name = item.path.split("/").pop();
      return arr.includes(name);
    });
    return items; // 返回结果数组
  };

  console.log(splicingData(pathname.split("/")));

  // const breadcrumbNameMap = routes.reduce((obj, item) => {
  //   obj[item.path] = item.breadcrumbName;
  //   return obj;
  // }, {});

  // 处理只允许展开一个menu
  const handleOpenChange = (_openKeys) => {
    setOpenKeys([_openKeys.pop()]);
  };

  return (
    <SessionProvider session={pageProps.session}>
      {router.route === "/login" ? (
        <Component {...pageProps} />
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
              items={items}
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
                items={splicingData(pathname.split("/")).map((item, index) => {
                  return {
                    // title: <Link href={item}>{breadcrumbNameMap[item]}</Link>,
                    title: <Link href={item.path}>{item.breadcrumbName}</Link>,
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
                <Component {...pageProps} />
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
    </SessionProvider>
  );
}
