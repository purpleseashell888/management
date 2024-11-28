import React, { useMemo, useState } from "react";
import { Tree } from "antd";
import { useMenu } from "@/lib/menu/useMenu";
import { useMenuAuthority } from "@/lib/authority/useMenuAuthority";
import addMenuAuthority from "@/lib/authority/addMenuAuthority";

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

export default function MenuTree(authorityId) {
  const [checkedKeys, setCheckedKeys] = useState([]);

  const { menu } = useMenu();
  const { menuAuthority, refetch } = useMenuAuthority(authorityId.authorityId);

  const treeData = useMemo(() => {
    return handleData(menu);
  }, [menu]);

  const matchCheckedKeys = useMemo(() => {
    // Step 0: If resultPath or apis is not valid, return an empty array
    if (!menuAuthority || !menu) {
      return []; // Return an empty array if data is null, undefined, or not an array
    }

    // Step 1: Check if resultPath is valid
    if (menuAuthority && menu) {
      // Step 2: Filter the apis based on matching paths in resultPath
      return menu
        .filter(
          (item) => menuAuthority.some((rp) => rp.ID === item.ID) // Match paths
        )
        .map((menu) => menu.ID); // Extract the IDs of the matched apis
    }
  }, [menuAuthority, menu]); // Dependencies: recalculate when resultPath or apis change

  console.log(matchCheckedKeys);

  useMemo(() => {
    setCheckedKeys(matchCheckedKeys);
  }, [matchCheckedKeys]);

  const onCheck = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue); // Update the checked keys in state
  };

  const menus = useMemo(() => {
    if (!menu) {
      return []; // Return an empty array if data is null, undefined, or not an array
    }

    if (menu) {
      return menu.filter((item) => checkedKeys.includes(item.ID)); // Find APIs where the ID matches
    }
  }, [menu, checkedKeys]);

  console.log("Checked APIs:", menus); // Log the checked APIs

  // 提交更新
  // addMenuAuthority(authorityId, menus)

  const handleUpdateMenuAuthority = async (authorityId, menus) => {
    await addMenuAuthority(authorityId, menus);
    //这个refetch是useMenuAuthority里的
    refetch();
  };

  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  return (
    <Tree
      checkable
      //   defaultExpandedKeys={["0-0-0", "0-0-1"]}
      //   defaultSelectedKeys={["0-0-0", "0-0-1"]}
      //   defaultCheckedKeys={["0-0-0", "0-0-1"]}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={treeData}
      defaultExpandAll={true}
    />
  );
}
