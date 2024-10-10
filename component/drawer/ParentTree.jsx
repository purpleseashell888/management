import React, { useState, useEffect } from "react";
import { Cascader } from "antd";
import { useMenu } from "@/lib/menu/useMenu";

const handleTree = (data) => {
  // Create the cell object for the current item
  const processItem = (item) => {
    let cell = {
      value: item.meta.title,
      label: item.meta.title,
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
    value: "root",
    label: "root",
    children: processedData, // Add the processed data as the children of the root node
  };
  return [root];
};

const findParent = (name, arr, res = []) => {
  // Start of the outer loop, which iterates over each item in the array
  for (const item of arr) {
    // Check if the current item has children
    if (item.children) {
      // Iterate over the children of the current item
      for (const subItem of item.children) {
        // If subItem has children, prioritize checking those first
        if (subItem.children) {
          let foundInChildren = false;
          for (const child of subItem.children) {
            if (child.value === name) {
              res.push(subItem.value); // Add subItem.children and break
              foundInChildren = true;
              break;
            }
          }
          // If found in subItem.children, skip checking subItem itself
          if (foundInChildren) continue;
        }

        // If subItem.value matches and no match was found in its children, add the parent item
        if (subItem.value === name) {
          res.push(item.value);
        }
      }
    }
  }
  // Return the result array, which will either be empty or contain the parent(s)
  return res;
};

export default function ParentTree({ name }) {
  const { menu } = useMenu();
  const [options, setOptions] = useState([]);
  const [parentId, setParentId] = useState(null); // Initialize parentId as null

  useEffect(() => {
    const processedTree = handleTree(menu); // Process the menu data
    setOptions(processedTree); // Update the state with processed routes

    const parentPath = findParent(name, processedTree);

    setParentId(parentPath.length > 0 ? parentPath : null); // Set parentId or null if no parents
  }, [menu, name]);

  const onChange = (value) => {
    console.log(value);
  };

  // Render nothing or a loader if options or parentId is not ready
  if (!options.length || parentId === null) {
    return <div>Loading...</div>;
  }

  // Just show the latest item.
  const displayRender = (labels) => labels[labels.length - 1];

  return (
    <Cascader
      defaultValue={parentId}
      options={options}
      displayRender={displayRender}
      onChange={onChange}
    />
  );
}
