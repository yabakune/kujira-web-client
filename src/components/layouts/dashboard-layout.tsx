import { useSelector } from "react-redux";

import * as Components from "@/components";
import * as Selectors from "@/selectors";

import Styles from "./dashboard-layout.module.scss";

type Props = {
  children: React.ReactNode;
};

export const DashboardLayout = (props: Props) => {
  console.log("Dashboard layout rendered");

  const currentUser = useSelector(Selectors.fetchCurrentUser);

  if (currentUser) {
    if (!currentUser.onboarded) return <Components.ToOnboarding />;
    else return <div className={Styles.container}>{props.children}</div>;
  } else {
    return <Components.Loading />;
  }
};
