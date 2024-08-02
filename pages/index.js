import { useSession } from "next-auth/react";

import { Button } from "antd";
import Login from "./login";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <Button type="primary">Button</Button>
      </div>
    );
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return <Login />;
}
