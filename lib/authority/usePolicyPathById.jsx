import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import getPolicyPathByAuthorityId from "./getPolicyPathByAuthorityId";

export function usePolicyPathById(authorityId) {
  const router = useRouter();
  const [resultPath, setResultPath] = useState(null);
  const [error, setError] = useState(null);
  //   const [loading, setLoading] = useState(false);

  // Define the fetch function using useCallback to prevent unnecessary re-creations
  const fetchData = useCallback(async () => {
    // setLoading(true);
    // const fetchData = await getPolicyPathByAuthorityId(authorityId);
    // console.log(fetchData);

    try {
      const result = await getPolicyPathByAuthorityId(authorityId);

      if (result.code === 0) {
        setResultPath(result.data.paths);
        setError(null); // Clear any previous errors
      } else if (result.code === 7) {
        router.replace("/login"); // Redirect if fetching fails due to auth
      } else {
        setError(result.message || "Failed to fetch path by id.");
      }
    } catch (err) {
      console.error("Error fetching path by id:", err);
      setError("An error occurred while fetching the path by id.");
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

  return { resultPath, error, refetch };
}
