import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import * as Constants from "@/constants";
import * as Selectors from "@/selectors";

const authRoutes: { [key: string]: number } = {
  [Constants.ClientRoutes.REGISTER]: 1,
  [Constants.ClientRoutes.LOGIN]: 2,
  [Constants.ClientRoutes.RESET_PASSWORD]: 3,
};

export function useAuthorization() {
  const router = useRouter();
  const currentUser = useSelector(Selectors.fetchCurrentUser);

  useEffect(() => {
    if (!currentUser) router.push(Constants.ClientRoutes.LOGIN);
    else {
      if (!!authRoutes[router.pathname]) {
        if (currentUser.onboarded) {
          router.push(Constants.ClientRoutes.ONBOARDING);
        } else {
          router.push(Constants.ClientRoutes.LOGBOOKS);
        }
      }
    }
  }, [currentUser]);
}
