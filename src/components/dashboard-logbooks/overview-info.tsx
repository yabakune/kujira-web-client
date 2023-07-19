import { useSignal } from "@preact/signals-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import { signalsStore } from "@/signals/signals";

import Styles from "./overview-info.module.scss";

export const OverviewInfo = () => {
  const dispatch = useDispatch();
  const { selectedLogbookId } = signalsStore;
  const { overviews } = useSelector(
    (state: Redux.ReduxStore) => state.entities
  );

  const income = useSignal("");
  const savings = useSignal("");

  useEffect(() => {
    if (selectedLogbookId.value) {
      // dispatch(Sagas.fetchlog)
    }
  }, [selectedLogbookId.value, overviews]);

  return (
    <section className={Styles.container}>
      <header className={Styles.header}>
        <h2 className={Styles.title}>My Overview</h2>
        <p className={Styles.saving}>
          Saving <span className={Styles.calculation}>$400.00</span>
        </p>
      </header>

      <article className={Styles.infoCells}></article>
    </section>
  );
};
