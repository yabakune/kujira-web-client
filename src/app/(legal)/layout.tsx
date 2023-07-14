import Styles from "./layout.module.scss";

type Props = { children: React.ReactNode };

const LegalLayout = (props: Props) => {
  return (
    <div className={Styles.container}>
      <main className={Styles.main}>{props.children}</main>
    </div>
  );
};

export default LegalLayout;
