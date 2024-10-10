import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import fetchMenu from "./fetchMenu";

export function useMenu() {
  const router = useRouter();
  const [menu, setMenu] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Define the fetch function using useCallback to prevent unnecessary re-creations
  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const result = await fetchMenu();

      if (result.code === 0) {
        setMenu(result.data.list);
        setError(null); // Clear any previous errors
      } else if (result.code === 7) {
        router.replace("/login"); // Redirect if fetching fails due to auth
      } else {
        setError(result.message || "Failed to fetch menu data.");
      }
    } catch (err) {
      console.error("Error fetching menu:", err);
      setError("An error occurred while fetching the menu.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Fetch menu data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Define the mutate function to allow manual re-fetching
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // useEffect(() => {
  //   const getMenu = async () => {
  //     const result = await fetchMenu();
  //     // console.log(result);

  //     if (result.code === 0) {
  //       setMenu(result.data.list);
  //     } else if (result.code === 7) {
  //       router.replace("/login"); // Redirect if fetching fails due to auth
  //     } else {
  //       setError("User is not authenticated or token is missing");
  //     }
  //   };

  //   getMenu();
  // }, []);

  return { menu, error, refetch };
}
