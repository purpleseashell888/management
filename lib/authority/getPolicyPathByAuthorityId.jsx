import { getSession } from "next-auth/react";

export default async function getPolicyPathByAuthorityId(authorityId) {
  try {
    const session = await getSession(); // Get the current session

    if (!session || !session.user?.accessToken) {
      throw new Error("User is not authenticated or token is missing");
    }

    const baseURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/proxy"
        : "https://api.jsonlee.cn";

    const response = await fetch(
      baseURL + "/casbin/getPolicyPathByAuthorityId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the appropriate content type
          "x-token": session.user.accessToken, // Include the token here
        },
        body: JSON.stringify({
          authorityId: authorityId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch apis path by id");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching apis path by id:", error);

    return null;
  }
}
