import { getSession } from "next-auth/react";

export default async function createAuthority(createData) {
  try {
    // Destructure necessary fields from updateData
    const { authorityId, authorityName, parentId } = createData;

    const session = await getSession(); // Get the current session

    if (!session || !session.user?.accessToken) {
      throw new Error("User is not authenticated or token is missing");
    }

    const baseURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/proxy"
        : "https://api.jsonlee.cn";

    const response = await fetch(baseURL + "/authority/createAuthority", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
        "x-token": session.user.accessToken, // Include the token here
      },
      body: JSON.stringify({
        authorityId: authorityId,
        authorityName: authorityName,
        parentId: parentId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create data");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error creating data:", error);
    return null;
  }
}
