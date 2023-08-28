import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import * as Constants from "@/constants";
import * as Selectors from "@/selectors";

const { REGISTER, LOGIN, RESET_PASSWORD, ONBOARDING, LOGBOOKS } =
  Constants.ClientRoutes;

const authRoutes: { [key: string]: number } = {
  [REGISTER]: 1,
  [LOGIN]: 2,
  [RESET_PASSWORD]: 3,
};

export function useAuthorization() {
  const router = useRouter();
  const currentUser = useSelector(Selectors.fetchCurrentUser);

  useEffect(() => {
    if (!currentUser) router.push(LOGIN);
    else {
      if (!!authRoutes[router.pathname]) {
        if (currentUser.onboarded) router.push(ONBOARDING);
        else router.push(LOGBOOKS);
      }
    }
  }, [currentUser]);
}
