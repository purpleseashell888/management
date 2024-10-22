import React, { useMemo } from "react";
import { TreeSelect } from "antd";
import { useAuthority } from "@/lib/authority/useAuthority";

const handleTree = (data) => {
  // Create the cell object for the current item
  const processItem = (item) => {
    let cell = {
      value: String(item.authorityId),
      title: item.authorityName,
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
    title: "根角色(严格模式下为当前用户角色)",
    children: processedData, // Add the processed data as the children of the root node
  };

  return [root];
};

export default function ParentRoles({ onChange, value }) {
  const { authority } = useAuthority();
  console.log(authority);

  const treeData = useMemo(() => handleTree(authority), [authority]);

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
