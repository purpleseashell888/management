import { useSession } from "next-auth/react";
import Login from "./login";
import Welcome from "./welcome";

export default function Home() {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <Welcome />
      </div>
    );
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return <Login />;
}
