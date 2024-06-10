import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import { CartContextProvider } from "../context/cart";

import { SessionProvider } from "next-auth/react";

import { useSession } from "next-auth/react";

import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CartContextProvider>
        {Component.auth ? (
          <Auth onlyAdmin={Component.auth.onlyAdmin}>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </CartContextProvider>
    </SessionProvider>
  );
}

function Auth({ children, onlyAdmin }) {
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthenticated");
    },
  });

  if (status === "loading") return "Loading...";

  if (onlyAdmin && !session.user.isAdmin)
    return router.push("/unauthenticated");

  return children;
}

export default MyApp;
