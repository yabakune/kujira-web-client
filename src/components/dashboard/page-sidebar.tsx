import Styles from "./page-sidebar.module.scss";
import TextStyles from "@/styles/texts.module.scss";

type Props = {
  title: string;
  caption: string;
  children: React.ReactNode;
};

export const PageSidebar = (props: Props) => {
  return (
    <aside className={Styles.container}>
      <section className={Styles.header}>
        <h1 className={TextStyles.titleText}>{props.title}</h1>
        <p className={Styles.caption}>{props.caption}</p>
      </section>

      <section className={Styles.navigation}>{props.children}</section>
    </aside>
  );
};
