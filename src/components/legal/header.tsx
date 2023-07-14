import Styles from "./header.module.scss";

type Props = {
  title: string;
  updatedAt: string;
  caption: string;
};

export const Header = (props: Props) => {
  return (
    <header className={Styles.header}>
      <h1 className={Styles.title}>{props.title}</h1>
      <h5 className={Styles.updatedAt}>Updated: {props.updatedAt}</h5>
      <p className={Styles.caption}>{props.caption}</p>
    </header>
  );
};
