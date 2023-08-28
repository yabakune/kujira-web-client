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
  return <Login />;
};

const ToLogbooks = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(Constants.ClientRoutes.LOGBOOKS, undefined, {
      shallow: true,
    });
  }, []);
  return <Logbooks />;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const userLoggedIn = Helpers.userId;

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
