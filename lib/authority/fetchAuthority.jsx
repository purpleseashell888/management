import { getSession } from "next-auth/react";

export default async function fetchAuthority() {
  try {
    const session = await getSession(); // Get the current session

    if (!session || !session.user?.accessToken) {
      throw new Error("User is not authenticated or token is missing");
    }

    const baseURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/proxy"
        : "https://api.jsonlee.cn";

    const response = await fetch(baseURL + "/authority/getAuthorityList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
        "x-token": session.user.accessToken, // Include the token here
      },
      body: JSON.stringify({
        page: 1,
        pageSize: 20,
      }), // You can pass an empty body if the API doesn't require any specific parameters
    });
    // console.log(response);

    if (!response.ok) {
      throw new Error("Failed to fetch Authority data");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching Authority:", error);
    return null;
  }
}
