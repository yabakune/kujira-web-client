import { useRouter } from "next/router";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";

type Props = {
  children: React.ReactNode;
};

export const DashboardLayout = (props: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { ClientRoutes } = Constants;
  const { currentUser, logbooks } = useSelector(
    (state: Redux.ReduxStore) => state.entities,
    shallowEqual
  );

  // useEffect(() => {
  //   if (currentUser && !currentUser.onboarded) {
  //     router.push(ClientRoutes.ONBOARDING);
  //   } else {
  //     router.push(ClientRoutes.LOGIN);
  //   }
  // }, [currentUser]);

  // useEffect(() => {
  //   if (!logbooks && Helpers.userId) {
  //     dispatch(Sagas.fetchUserLogbooksRequest({ userId: Helpers.userId }));
  //   }
  // }, [logbooks]);

  return <>Dashboard Layout {props.children}</>;
};
