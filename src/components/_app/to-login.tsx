import { useRouter } from "next/router";
import { useEffect } from "react";

import * as Constants from "@/constants";
import * as Components from "@/components";
import Login from "@/pages/login";

export const ToLogin = () => {
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
