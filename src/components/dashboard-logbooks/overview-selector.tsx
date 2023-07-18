import * as Components from "@/components";
import * as Redux from "@/redux";

import Styles from "./overview-selector.module.scss";
import TextStyles from "@/styles/texts.module.scss";
import { useSelector } from "react-redux";

export const OverviewSelector = () => {
  const {} = useSelector((state: Redux.ReduxStore) => );

  return (
    <section className={Styles.container}>
      <h2 className={TextStyles.titleText}>Select a logbook below</h2>
      <article className={Styles.selectionButtons}></article>
    </section>
  );
};
