import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import * as Constants from "@/constants";
import * as Redux from "@/redux";

import Styles from "./auth-layout.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Props = {
  children: React.ReactNode;
};

export const AuthLayout = (props: Props) => {
  const router = useRouter();
  const { ClientRoutes } = Constants;

  const { currentUser } = useSelector(
    (state: Redux.ReduxStore) => state.entities
  );

  useEffect(() => {
    if (currentUser) {
      if (!currentUser.onboarded) router.push(ClientRoutes.ONBOARDING);
      else router.push(ClientRoutes.LOGBOOKS);
    }
  }, [currentUser]);

  return (
    <div className={`${Styles.container} ${Snippets.responsiveSidePadding}`}>
      <div className={Styles.form}>{props.children}</div>
    </div>
  );
};
