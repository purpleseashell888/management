import { SessionProvider } from "next-auth/react";

import React from "react";
import Dashboard from "@/component/dashboard";

import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Dashboard>
        <Component {...pageProps} />
      </Dashboard>
    </SessionProvider>
  );
}
