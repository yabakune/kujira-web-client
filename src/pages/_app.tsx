import { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import { reduxStore } from "@/redux";

import Logbooks from "./dashboard/logbooks";
import Login from "./login";

import "@/styles/globals.scss";
import { useSignal } from "@preact/signals-react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

const ToLogin = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(Constants.ClientRoutes.LOGIN, undefined, { shallow: true });
  }, []);
  if (router.pathname === Constants.ClientRoutes.LOGIN) {
    return <Login />;
  } else {
    return <Components.Loading />;
  }
};

const ToLogbooks = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(Constants.ClientRoutes.LOGBOOKS, undefined, {
      shallow: true,
    });
  }, []);
  if (router.pathname === Constants.ClientRoutes.LOGBOOKS) {
    return <Logbooks />;
  } else {
    return <Components.Loading />;
  }
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const userLoggedIn = Helpers.userId;

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
            <ToLogbooks />
          ) : pageProps.requiresAuthorization && !userLoggedIn ? (
            <ToLogin />
          ) : (
            getLayout(<Component {...pageProps} />)
          ))}
      </Components.AppLayout>
    </ReduxProvider>
  );
}
