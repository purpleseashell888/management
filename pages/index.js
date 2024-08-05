import { useSession } from "next-auth/react";
import Login from "./login";
import Dashboard from "./dashbord";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return <Login />;
}
