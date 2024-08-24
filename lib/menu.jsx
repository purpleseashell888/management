export default async function createMenu() {
  try {
    // console.debug(process.env.NODE_ENV, "????");

    const baseURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/proxy"
        : "https://api.jsonlee.cn";

    const response = await fetch(baseURL + "/menu/getMenuList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
      body: JSON.stringify({
        page: 1,
        pageSize: 20,
      }), // You can pass an empty body if the API doesn't require any specific parameters
    });
    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to fetch Menu data");
    }

    const result = await response.json();

    if (!result.data) {
      throw new Error("Invalid Menu data");
    }

    return result;
  } catch (error) {
    console.error("Error fetching Menu:", error);
    return null;
  }
}
