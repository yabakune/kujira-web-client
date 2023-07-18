import { Signal } from "@preact/signals-react";
import { useSelector } from "react-redux";

import * as Components from "@/components";
import * as Redux from "@/redux";
import * as Types from "@/types";

import Styles from "./overview-selector.module.scss";
import TextStyles from "@/styles/texts.module.scss";

type Props = { selectedLogbook: Signal<string> };

export const OverviewSelector = (props: Props) => {
  const { logbooks } = useSelector((state: Redux.ReduxStore) => state.entities);

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
                onClick={() => (props.selectedLogbook.value = logbook.name)}
                borderRadius={10}
                backgroundLevel={1}
                selected={logbook.name === props.selectedLogbook.value}
                addClick
              />
            );
          })}
      </article>
    </section>
  );
};
