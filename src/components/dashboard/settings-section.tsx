import * as Types from "@/types";

import Styles from "./settings-section.module.scss";
import TextStyles from "@/styles/texts.module.scss";

type Props = {
  title: string;
  onSubmit: (event: Types.OnSubmit) => void;
  children: React.ReactNode;
};

export const SettingsSection = (props: Props) => {
  return (
    <form className={Styles.container} onSubmit={props.onSubmit}>
      <h5 className={TextStyles.titleText}>{props.title}</h5>
      <article className={Styles.body}>{props.children}</article>
    </form>
  );
};
