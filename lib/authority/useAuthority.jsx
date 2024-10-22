import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import fetchAuthority from "./fetchAuthority";

export function useAuthority() {
  const router = useRouter();
  const [authority, setAuthority] = useState(null);
  const [error, setError] = useState(null);
  //   const [loading, setLoading] = useState(false);

  // Define the fetch function using useCallback to prevent unnecessary re-creations
  const fetchData = useCallback(async () => {
    // setLoading(true);

    try {
      const result = await fetchAuthority();

      if (result.code === 0) {
        setAuthority(result.data.list);
        setError(null); // Clear any previous errors
      } else if (result.code === 7) {
        router.replace("/login"); // Redirect if fetching fails due to auth
      } else {
        setError(result.message || "Failed to fetch authority data.");
      }
    } catch (err) {
      console.error("Error fetching authority data:", err);
      setError("An error occurred while fetching the authority data.");
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

  return { authority, error, refetch };
}
