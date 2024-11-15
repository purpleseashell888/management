import React, { useMemo, useState } from "react";
import { Tree } from "antd";
import { useMenu } from "@/lib/menu/useMenu";

const handleData = (data) => {
  const processItem = (item) => {
    // Create the cell object for the current item
    let cell = {
      title: item.meta.title,
      key: item.ID,
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

export default function MenuTree() {
  const { menu } = useMenu();

  const treeData = useMemo(() => {
    return handleData(menu);
  }, [menu]);

  // console.log(treeData);

  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  return (
    <Tree
      checkable
      //   defaultExpandedKeys={["0-0-0", "0-0-1"]}
      //   defaultSelectedKeys={["0-0-0", "0-0-1"]}
      //   defaultCheckedKeys={["0-0-0", "0-0-1"]}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={treeData}
      defaultExpandAll={true}
    />
  );
}
