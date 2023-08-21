import { useEffect } from "react";
import { useSelector } from "react-redux";

import * as Constants from "@/constants";
import * as Redux from "@/redux";

import { NextPageWithLayout } from "./_app";
import { useRouter } from "next/router";

const Onboarding: NextPageWithLayout = () => {
  const router = useRouter();

  const { ClientRoutes } = Constants;
  const { currentUser } = useSelector(
    (state: Redux.ReduxStore) => state.entities
  );

  useEffect(() => {
    if (currentUser) {
      if (currentUser.onboarded) router.push(ClientRoutes.LOGBOOKS);
    } else {
      router.push(ClientRoutes.LOGIN);
    }
  }, [currentUser]);

  return <div>Onboarding</div>;
};

export default Onboarding;
