import React, { useState } from "react";
import { Drawer, Tabs } from "antd";
import MenuTree from "./MenuTree";
import ApiTree from "./ApiTree";

const onChange = (key) => {
  console.log(key);
};

export default function SetAuthority({ children, record }) {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const authorityId = Number(record.key);

  const items = [
    {
      key: "1",
      label: "角色菜单",
      children: <MenuTree authorityId={authorityId} />,
    },
    {
      key: "2",
      label: "角色api",
      children: <ApiTree authorityId={authorityId} />,
    },
  ];

  return (
    <>
      <a type="primary" onClick={showDrawer}>
        {children}
      </a>
      <Drawer width={683} onClose={onClose} open={open}>
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          type="card"
          //   tabBarGutter={30}
          //   tabBarExtraContent={{ size: 200, align: "center" }}
        />
      </Drawer>
    </>
  );
}
