import Styles from "./settings-section.module.scss";
import TextStyles from "@/styles/texts.module.scss";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const SettingsSection = (props: Props) => {
  return (
    <section className={Styles.container}>
      <h5 className={TextStyles.titleText}>{props.title}</h5>
      <article className={Styles.body}>{props.children}</article>
    </section>
  );
};
