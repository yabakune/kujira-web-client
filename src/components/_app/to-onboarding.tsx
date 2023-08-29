import { useRouter } from "next/router";
import { useEffect } from "react";

import * as Constants from "@/constants";
import * as Components from "@/components";
import Onboarding from "@/pages/onboarding";

export const ToOnboarding = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(Constants.ClientRoutes.ONBOARDING, undefined, {
      shallow: true,
    });
  }, []);

  if (router.pathname === Constants.ClientRoutes.ONBOARDING) {
    return <Onboarding />;
  } else {
    return <Components.Loading />;
  }
};
