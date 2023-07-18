import { useSelector } from "react-redux";

import * as Components from "@/components";
import * as Redux from "@/redux";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import Styles from "./overview-selector.module.scss";
import TextStyles from "@/styles/texts.module.scss";

export const OverviewSelector = () => {
  const { logbooks } = useSelector((state: Redux.ReduxStore) => state.entities);
  const { selectedLogbookId } = signalsStore;

  return (
    <section className={Styles.container}>
      <h2 className={TextStyles.titleText}>Select a logbook below</h2>
      <article className={Styles.selectionButtons}>
        {logbooks &&
          Object.values(logbooks).map((logbook: Types.LogbookModel) => {
            return (
              <Components.Button
                key={`dashboard-logbooks-${logbook.name}-button`}
                type="button"
                text={logbook.name}
                onClick={() => (selectedLogbookId.value = logbook.id)}
                borderRadius={10}
                backgroundLevel={1}
                selected={logbook.id === selectedLogbookId.value}
                addClick
              />
            );
          })}
      </article>
    </section>
  );
};
