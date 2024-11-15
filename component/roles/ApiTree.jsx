import React, { useMemo, useState } from "react";
import { Tree } from "antd";
import { useApis } from "@/lib/authority/useApis";
import { usePolicyPathById } from "@/lib/authority/usePolicyPathById";
import { useUpdateCasbin } from "@/lib/authority/useUpdateCasbin";

const handleData = (data) => {
  // Step 0: Check if data is null, undefined, or not an array
  if (!Array.isArray(data) || data.length === 0) {
    return []; // Return an empty array if data is null, undefined, or not an array
  }

  // Step 1: Group data by apiGroup
  const groupedData = data.reduce((result, item) => {
    const group = item.apiGroup;

    // Initialize the group if it doesn't exist
    if (!result[group]) {
      result[group] = [];
    }

    // Add the item to the group, preserving the relevant properties
    result[group].push({
      title: (
        <div style={{ width: "100%" }} className="flex justify-between">
          <span>{item.description}</span>
          <span>{item.path}</span>
        </div>
      ), // The title of the item
      key: item.ID, // Unique key for each item
      checked: false,
      //   disabled: item.disabled, // If item has 'disabled', it will be added
    });

    return result;
  }, {});

  // Step 2: Transform grouped data into the desired tree structure
  const treeData = Object.keys(groupedData).map((group, index) => ({
    title: `${group + "组"}`, // The group becomes the title
    key: `${"0-0-" + index}`, // Create a unique key for the group
    children: groupedData[group], // The group's children are the items in that group
  }));

  return treeData; // Return the final treeData structure
};

export default function ApiTree(authorityId) {
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [casbinInfos, setCasbinInfos] = useState([]);

  const { apis } = useApis();
  console.log(apis);
  const { resultPath, refetch } = usePolicyPathById(authorityId.authorityId);
  console.log(resultPath);

  const treeData = useMemo(() => {
    return handleData(apis);
  }, [apis]);

  // 最开始没有打钩，为了给有权限的path打钩
  // 当resultPath里path的值等于apis里path的值的时候，把api里ID赋值给CheckedKeys
  const matchCheckedKeys = useMemo(() => {
    // Step 1: Check if resultPath is valid
    if (resultPath && apis) {
      // Step 2: Filter the apis based on matching paths in resultPath
      return apis
        .filter(
          (api) => resultPath.some((rp) => rp.path === api.path) // Match paths
        )
        .map((api) => api.ID); // Extract the IDs of the matched apis
    }
    // Step 3: If resultPath is not valid, return an empty array
    return [];
  }, [resultPath, apis]); // Dependencies: recalculate when resultPath or apis change

  useMemo(() => {
    setCheckedKeys(matchCheckedKeys);
  }, [matchCheckedKeys]);

  const onCheck = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue); // Update the checked keys in state

    // Loop through checkedKeysValue and find the corresponding API objects
    const casbinInfos = apis
      .filter((api) => checkedKeysValue.includes(api.ID)) // Find APIs where the ID matches
      .map((api) => ({ path: api.path, method: api.method })); // Extract the path and method from each matching API

    console.log("Checked APIs:", casbinInfos); // Log the checked APIs
    setCasbinInfos(casbinInfos);
  };
  console.log(casbinInfos);

  useUpdateCasbin(authorityId.authorityId, casbinInfos);

  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  return (
    <Tree
      blockNode
      checkable
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      treeData={treeData}
      defaultExpandAll={true}
    />
  );
}
