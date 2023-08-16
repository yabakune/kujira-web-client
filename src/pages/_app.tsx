import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";

import * as Components from "@/components";
import { reduxStore } from "@/redux";

import "@/styles/globals.scss";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ReduxProvider store={reduxStore}>
      <Components.AppLayout>
        {getLayout(<Component {...pageProps} />)}
      </Components.AppLayout>
    </ReduxProvider>
  );
}
