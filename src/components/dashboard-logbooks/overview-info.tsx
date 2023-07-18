import { useSignal } from "@preact/signals-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import * as Redux from "@/redux";

import Styles from "./overview-info.module.scss";

export const OverviewInfo = () => {
  const { overviews } = useSelector(
    (state: Redux.ReduxStore) => state.entities
  );

  const income = useSignal("");
  const savings = useSignal("");

  useEffect(() => {}, [overviews]);

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
