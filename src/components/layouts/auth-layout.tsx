import Styles from "./auth-layout.module.scss";

export const AuthLayout = (props: { children: React.ReactNode }) => {
  return <main className={Styles.main}>{props.children}</main>;
};
