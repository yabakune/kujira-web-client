import { useRouter } from "next/router";

import * as Constants from "@/constants";
import * as Redux from "@/redux";

import Styles from "./auth-layout.module.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const AuthLayout = (props: { children: React.ReactNode }) => {
  const router = useRouter();

  const { currentUser } = useSelector(
    (state: Redux.ReduxState) => state.entities
  );

  useEffect(() => {
    if (currentUser) router.push(Constants.ClientRoutes.LOGBOOKS);
  }, [currentUser]);

  return <main className={Styles.main}>{props.children}</main>;
};
