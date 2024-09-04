import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fetchMenu from "./fetchMenu";

export function useMenu() {
  const router = useRouter();
  const [menu, setMenu] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMenu = async () => {
      const result = await fetchMenu();
      // console.log(result);

      if (result.code === 0) {
        setMenu(result.data.list);
      } else if (result.code === 7) {
        router.replace("/login"); // Redirect if fetching fails due to auth
      } else {
        setError("User is not authenticated or token is missing");
      }
    };

    getMenu();
  }, []);

  return { menu, error };
}
