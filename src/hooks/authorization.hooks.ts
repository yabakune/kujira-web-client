import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import * as Constants from "@/constants";
import * as Selectors from "@/selectors";

const {
  TERMS_OF_SERVICE,
  PRIVACY_POLICY,
  COOKIE_POLICY,
  LANDING,
  REGISTER,
  LOGIN,
  PASSWORD_RESET,
  ONBOARDING,
  LOGBOOKS,
} = Constants.ClientRoutes;

const openRoutes: { [key: string]: number } = {
  [TERMS_OF_SERVICE]: 1,
  [PRIVACY_POLICY]: 1,
  [COOKIE_POLICY]: 1,
};

const unauthenticatedRoutes: { [key: string]: number } = {
  [LANDING]: 1,
  [REGISTER]: 1,
  [LOGIN]: 1,
  [PASSWORD_RESET]: 1,
};

export function useAuthorization() {
  const router = useRouter();
  const currentUser = useSelector(Selectors.fetchCurrentUser);

  const notInAnOpenRoute = !openRoutes[router.pathname];
  const notInAnAuthRoute = !unauthenticatedRoutes[router.pathname];

  console.log("notInAnAuthRoute:", notInAnAuthRoute);

  useEffect(() => {
    if (notInAnOpenRoute) {
      if (!currentUser) {
        if (notInAnAuthRoute) router.push(LOGIN);
      } else {
        if (!currentUser.onboarded) router.push(ONBOARDING);
        else {
          if (!notInAnAuthRoute) router.push(LOGBOOKS);
        }
      }
    }
  }, [currentUser]);
}
