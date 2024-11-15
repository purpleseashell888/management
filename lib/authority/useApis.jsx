import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import getAllApis from "./getAllApis";

export function useApis() {
  const router = useRouter();
  const [apis, setApis] = useState(null);
  const [error, setError] = useState(null);
  //   const [loading, setLoading] = useState(false);

  // Define the fetch function using useCallback to prevent unnecessary re-creations
  const fetchData = useCallback(async () => {
    // setLoading(true);

    try {
      const result = await getAllApis();

      if (result.code === 0) {
        setApis(result.data.apis);
        setError(null); // Clear any previous errors
      } else if (result.code === 7) {
        router.replace("/login"); // Redirect if fetching fails due to auth
      } else {
        setError(result.message || "Failed to fetch apis data.");
      }
    } catch (err) {
      console.error("Error fetching apis data:", err);
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

  return { apis, error, refetch };
}
