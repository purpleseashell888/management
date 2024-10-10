import { getSession } from "next-auth/react";

export default async function updateMenuItem(updateData) {
  try {
    // console.debug(process.env.NODE_ENV, "????");

    // Destructure necessary fields from updateData
    const {
      itemId,
      title,
      route,
      path,
      hidden,
      parentId,
      component,
      icon,
      sort,
      menu,
      alive,
      closeTab,
      page,
    } = updateData;

    if (!itemId) {
      throw new Error("Item ID is required for updating.");
    }

    const session = await getSession(); // Get the current session
    // console.log(session.user.accessToken);

    if (!session || !session.user?.accessToken) {
      throw new Error("User is not authenticated or token is missing");
    }

    const baseURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/proxy"
        : "https://api.jsonlee.cn";

    const response = await fetch(baseURL + "/menu/updateBaseMenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
        "x-token": session.user.accessToken, // Include the token here
      },
      body: JSON.stringify({
        name: title,
        id: itemId,
        meta: {
          title: title,
          alive: alive,
          closeTab: closeTab,
          icon: icon,
        },
        route: route,
        path: path,
        hidden: hidden,
        parentId: parentId,
        component: component,

        sort: sort,
        menu: menu,

        page: page,
      }), // You can pass an empty body if the API doesn't require any specific parameters
    });
    // console.log(response);

    if (!response.ok) {
      throw new Error("Failed to update data");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error updating data:", error);
    return null;
  }
}
