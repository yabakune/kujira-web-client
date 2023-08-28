import { AuthorizationLayout } from "./authorization-layout";

import Styles from "./dashboard-layout.module.scss";

type Props = {
  children: React.ReactNode;
};

export const DashboardLayout = (props: Props) => {
  return (
    <AuthorizationLayout>
      <div className={Styles.container}>Dashboard Layout {props.children}</div>
    </AuthorizationLayout>
  );
};
