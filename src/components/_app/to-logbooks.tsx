import { useRouter } from "next/router";
import { useEffect } from "react";

import * as Constants from "@/constants";
import * as Components from "@/components";
import Logbooks from "@/pages/dashboard/logbooks";

export const ToLogbooks = () => {
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
