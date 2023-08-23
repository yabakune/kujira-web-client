import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Constants from "@/constants";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";

type Props = {
  children: React.ReactNode;
};

export const DashboardLayout = (props: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { ClientRoutes } = Constants;
  const { currentUser } = useSelector(
    (state: Redux.ReduxStore) => state.entities
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(Sagas.fetchUserLogbooksRequest({ userId: currentUser.id }));
      if (!currentUser.onboarded) router.push(ClientRoutes.ONBOARDING);
    } else {
      router.push(ClientRoutes.LOGIN);
    }
  }, [currentUser]);

  return <>Dashboard Layout {props.children}</>;
};
