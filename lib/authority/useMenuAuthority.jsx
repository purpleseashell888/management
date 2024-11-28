import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import getMenuAuthority from "./getMenuAuthority";

export function useMenuAuthority(authorityId) {
  const router = useRouter();
  const [menuAuthority, setMenuAuthority] = useState(null);
  const [error, setError] = useState(null);
  //   const [loading, setLoading] = useState(false);

  // Define the fetch function using useCallback to prevent unnecessary re-creations
  const fetchData = useCallback(async () => {
    // setLoading(true);
    // const fetchData = await getPolicyPathByAuthorityId(authorityId);
    // console.log(fetchData);

    try {
      const result = await getMenuAuthority(authorityId);

      if (result.code === 0) {
        setMenuAuthority(result.data.menus);
        setError(null); // Clear any previous errors
      } else if (result.code === 7) {
        router.replace("/login"); // Redirect if fetching fails due to auth
      } else {
        setError(result.message || "Failed to fetch menu by id.");
      }
    } catch (err) {
      console.error("Error fetching menu by id:", err);
      setError("An error occurred while fetching the menu by id.");
    }
  }, [router, authorityId]);

  // Fetch menu data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Define the mutate function to allow manual re-fetching
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { menuAuthority, error, refetch };
}
