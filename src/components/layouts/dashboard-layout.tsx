import Styles from "./dashboard-layout.module.scss";

type Props = {
  children: React.ReactNode;
};

export const DashboardLayout = (props: Props) => {
  console.log("Dashboard layout rendered");

  return <div className={Styles.container}>{props.children}</div>;
};
