import React, { useState, useEffect, useMemo } from "react";
import { TreeSelect } from "antd";
import { useMenu } from "@/lib/menu/useMenu";

const handleTree = (data) => {
  // Create the cell object for the current item
  const processItem = (item) => {
    let cell = {
      value: String(item.ID),
      title: item.meta.title,
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

  // Wrap the processed data in a root node with value 'root' and label 'root'
  const root = {
    value: "0",
    title: "root",
    children: processedData, // Add the processed data as the children of the root node
  };

  return [root];
};

export default function ParentTree({ onChange, value }) {
  const { menu } = useMenu();

  const treeData = useMemo(() => handleTree(menu), [menu]);

  return (
    <TreeSelect
      showSearch
      style={{
        width: "100%",
      }}
      value={value}
      dropdownStyle={{
        maxHeight: 400,
        overflow: "auto",
      }}
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
      treeData={treeData}
    />
  );
}
