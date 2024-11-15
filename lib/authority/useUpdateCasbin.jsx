import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import updateCasbin from "./updateCasbin";

export function useUpdateCasbin(authorityId, casbinInfos) {
  const router = useRouter();
  const [casbin, setCasbin] = useState(null);
  const [error, setError] = useState(null);
  //   const [loading, setLoading] = useState(false);

  // Define the fetch function using useCallback to prevent unnecessary re-creations
  const fetchData = useCallback(async () => {
    // setLoading(true);

    try {
      const result = await updateCasbin(authorityId, casbinInfos);

      console.log(result);

      //   if (result.code === 0) {
      //     setCasbin(result.data.list);
      //     setError(null); // Clear any previous errors
      //   } else if (result.code === 7) {
      //     router.replace("/login"); // Redirect if fetching fails due to auth
      //   } else {
      //     setError(result.message || "Failed to update Casbin.");
      //   }
    } catch (err) {
      console.error("Error update Casbin:", err);
      setError("An error occurred while  update Casbin.");
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

  return { casbin, error, refetch };
}
