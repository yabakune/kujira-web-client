import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Redux from "@/redux";

import Styles from "./auth-layout.module.scss";

type Props = { children: React.ReactNode };

export const AuthLayout = (props: Props) => {
  const router = useRouter();

  const { currentUser } = useSelector(
    (state: Redux.ReduxState) => state.entities
  );

  useEffect(() => {
    if (currentUser) router.push(Constants.ClientRoutes.LOGBOOKS);
  }, [router, currentUser]);

  return (
    <div className={Styles.container}>
      <main className={Styles.main}>
        <Components.LogoFullHorizontal width={160} />
        {props.children}
      </main>
    </div>
  );
};
