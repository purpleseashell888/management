import React, { useEffect, useState, useContext, useMemo } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
// import fetchMenu from "@/lib/menu/fetchMenu";
import { MenuContext } from "@/context/MenuContext";
import { IconPark } from "jsonlee-ui-react";

const { Header, Content, Footer, Sider } = Layout;

const handleRoutes = (data) => {
  // Create the cell object for the current item
  const processItem = (item) => {
    // Skip item if hidden is true
    if (item.hidden === true) {
      return null; // Exclude this item
    }

    let cell = {
      key: item.path,
      label: item.meta.title,
      icon: <IconPark name={item.meta.icon} />,
      // icon: item.meta.icon,
    };

    // Recursively process children if they exist and are not null
    if (item.children && item.children.length > 0) {
      const processedChildren = item.children
        .map(processItem)
        .filter((child) => child !== null);
      if (processedChildren.length > 0) {
        cell.children = processedChildren;
      }
    }

    return cell;
  };

  // Process the root data array, filtering out any null items
  const processedData = (data ?? [])
    .map(processItem)
    .filter((item) => item !== null);

  return processedData;
};

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
  // const [route, setRoute] = useState([]); // New state for the route data
  // const [flattenRoutes, setFlattenRoutes] = useState([]); // New state for the route data

  const router = useRouter();
  const { pathname } = router;
  // const defaultSelectedKeys = [pathname];

  const { menuData } = useContext(MenuContext);

  const route = useMemo(() => handleRoutes(menuData), [menuData]);
  const flattenRoutes = useMemo(() => flatten(route), [route]);

  // useEffect(() => {
  //   const processedRoutes = handleRoutes(menuData); // Process the menu data
  //   setRoute(processedRoutes); // Update the state with processed routes

  //   const flattedData = flatten(processedRoutes);
  //   setFlattenRoutes(flattedData);
  // }, [menuData]);

  const defaultOpenKeys = findParent(pathname, route).map((item) => item.key);

  const [selectedKeys, setSelectedKeys] = useState([pathname]);
  const [openKeys, setOpenKeys] = useState(defaultOpenKeys);

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

  // Update openKeys and selectedKeys whenever pathname or route changes
  useEffect(() => {
    const parentKeys = findParent(pathname, route).map((item) => item.key);
    setOpenKeys(parentKeys);
    setSelectedKeys([pathname]);
  }, [pathname, route]);

  return (
    <div className="overflow-hidden">
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
            // collapsible
            // collapsed={collapsed}
            // onCollapse={(value) => setCollapsed(value)}
            theme="light"
          >
            <div className="flex items-center justify-center h-[60px] ">
              <span className="text-2xl">后台管理</span>
            </div>
            <div className="demo-logo-vertical" />
            <Menu
              theme="light"
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              mode="inline"
              items={route}
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
