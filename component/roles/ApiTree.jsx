import React, { useMemo, useState } from "react";
import { Tree } from "antd";
import { useApis } from "@/lib/authority/useApis";
import { usePolicyPathById } from "@/lib/authority/usePolicyPathById";
import { useUpdateCasbin } from "@/lib/authority/useUpdateCasbin";
import updateCasbin from "@/lib/authority/updateCasbin";

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
  // const [casbinInfos, setCasbinInfos] = useState([]);

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
    // Step 0: If resultPath or apis is not valid, return an empty array
    if (!resultPath || !apis) {
      return []; // Return an empty array if data is null, undefined, or not an array
    }

    // Step 1: Check if resultPath is valid
    if (resultPath && apis) {
      // Step 2: Filter the apis based on matching paths in resultPath
      return apis
        .filter(
          (api) => resultPath.some((rp) => rp.path === api.path) // Match paths
        )
        .map((api) => api.ID); // Extract the IDs of the matched apis
    }
  }, [resultPath, apis]); // Dependencies: recalculate when resultPath or apis change

  useMemo(() => {
    setCheckedKeys(matchCheckedKeys);
  }, [matchCheckedKeys]);

  const onCheck = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue); // Update the checked keys in state
  };

  // Loop through checkedKeysValue and find the corresponding API objects
  // 为useUpdateCasbin做准备

  const casbinInfos = useMemo(() => {
    if (!apis) {
      return []; // Return an empty array if data is null, undefined, or not an array
    }
    if (apis) {
      return (
        apis
          .filter((api) => checkedKeys.includes(api.ID)) // Find APIs where the ID matches
          // Extract the path and method from each matching API
          .map((api) => ({ path: api.path, method: api.method }))
      );
    }
  }, [apis, checkedKeys]);

  console.log("Checked APIs:", casbinInfos); // Log the checked APIs

  //是不是复杂了，不用写这么多，直接updateCasbin(authorityId, casbinInfos);
  const handleUpdateCasbin = async (authorityId, casbinInfos) => {
    await updateCasbin(authorityId, casbinInfos);
    //这个refetch是usePolicyPathById里的
    refetch();
  };

  // useUpdateCasbin(authorityId.authorityId, casbinInfos);
  //这个refetch是usePolicyPathById里的
  // refetch()

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
