import fetchMenu from "@/lib/menu/fetchMenu";
import React, { createContext, useState, useEffect } from "react";

export const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [menuData, setMenuData] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  // Function to fetch the menu data
  const loadMenuData = async () => {
    const data = await fetchMenu();
    const menu = data.data.list;
    setMenuData(menu);
  };

  // Re-fetch data when the updateTrigger changes
  useEffect(() => {
    loadMenuData();
  }, [updateTrigger]);

  // Function to trigger re-fetch after update
  const triggerUpdate = () => {
    setUpdateTrigger((prev) => !prev); // Toggle the state to trigger re-fetch
  };

  return (
    <MenuContext.Provider value={{ menuData, triggerUpdate }}>
      {children}
    </MenuContext.Provider>
  );
}
