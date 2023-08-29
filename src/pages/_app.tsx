import { useSignal } from "@preact/signals-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import type { AppProps } from "next/app";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import { reduxStore } from "@/redux";

import "@/styles/globals.scss";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

const userLoggedIn = Helpers.userId;

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  // Required for server-side authorization re-routing to work on the client.
  const mounted = useSignal(false);

  useEffect(() => {
    mounted.value = true;
    router.replace(router.pathname, undefined, { shallow: true });
  }, []);

  return (
    <ReduxProvider store={reduxStore}>
      <Components.AppLayout>
        {mounted.value &&
          (pageProps.authenticationRoute && userLoggedIn ? (
            <Components.ToLogbooks />
          ) : pageProps.requiresAuthorization && !userLoggedIn ? (
            <Components.ToLogin />
          ) : (
            getLayout(<Component {...pageProps} />)
          ))}
      </Components.AppLayout>
    </ReduxProvider>
  );
}
