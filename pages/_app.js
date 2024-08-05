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

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const routes = [
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

export default function App({ Component, pageProps }) {
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();

  const onClick = (e) => {
    router.push(e.key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const splicingData = (arr) => {
    let items = []; // 存储拼接后的路径字符串数组
    for (let i = 0; i < arr.length; i++) {
      // 将当前数组的前i个元素拼接成一个路径，并加入到items数组中
      items.push(arr.slice(0, i + 1).join("/"));
    }
    return items; // 返回结果数组
  };

  const { pathname } = router;

  const breadcrumbNameMap = routes.reduce((obj, item) => {
    obj[item.path] = item.breadcrumbName;
    return obj;
  }, {});

  return (
    <SessionProvider session={pageProps.session}>
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
            defaultSelectedKeys={["/dashboard"]}
            mode="inline"
            items={items}
            onClick={onClick}
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
                  title: <Link href={item}>{breadcrumbNameMap[item]}</Link>,
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
    </SessionProvider>
  );
}
