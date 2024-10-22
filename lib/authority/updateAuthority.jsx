import { getSession } from "next-auth/react";

export default async function updateAuthority(updateData) {
  try {
    // Destructure necessary fields from updateData
    const { parentId, authorityId, authorityName } = updateData;

    const session = await getSession(); // Get the current session
    // console.log(session.user.accessToken);

    if (!session || !session.user?.accessToken) {
      throw new Error("User is not authenticated or token is missing");
    }

    const baseURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/proxy"
        : "https://api.jsonlee.cn";

    const response = await fetch(baseURL + "/authority/updateAuthority", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
        "x-token": session.user.accessToken, // Include the token here
      },
      body: JSON.stringify({
        authorityName: authorityName,
        authorityId: authorityId,
        parentId: parentId,
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
