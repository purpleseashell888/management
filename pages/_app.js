import { SessionProvider } from "next-auth/react";
import { MenuProvider } from "@/context/MenuContext";

import React from "react";
import Dashboard from "@/component/dashboard";

import "@/styles/globals.css";
import "jsonlee-ui-react/dist/styles/style.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <MenuProvider>
        <Dashboard>
          <Component {...pageProps} />
        </Dashboard>
      </MenuProvider>
    </SessionProvider>
  );
}
