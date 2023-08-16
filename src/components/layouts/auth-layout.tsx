import Styles from "./auth-layout.module.scss";

type Props = {
  children: React.ReactNode;
};

export const AuthLayout = (props: Props) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.form}>{props.children}</div>
    </div>
  );
};
