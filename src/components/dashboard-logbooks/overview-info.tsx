import { useSignal } from "@preact/signals-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import { signalsStore } from "@/signals/signals";

import Styles from "./overview-info.module.scss";

export const OverviewInfo = () => {
  const dispatch = useDispatch();
  const { selectedLogbookId } = signalsStore;

  const currentOverview = useSelector((state: Redux.ReduxStore) => {
    return Selectors.selectLogbookOverview(state, selectedLogbookId.value);
  });

  const income = useSignal("");
  const savings = useSignal("");

  useEffect(() => {
    if (selectedLogbookId.value && Constants.userId) {
      dispatch(
        Sagas.fetchLogbookOverviewRequest({
          logbookId: selectedLogbookId.value,
          userId: Constants.userId,
        })
      );
    }
  }, [selectedLogbookId.value]);

  useEffect(() => {
    if (currentOverview) {
      income.value = currentOverview.income.toString();
      savings.value = currentOverview.savings.toString();
    } else {
      income.value = "";
      savings.value = "";
    }
  }, [currentOverview]);

  return (
    <section className={Styles.container}>
      <header className={Styles.header}>
        <h2 className={Styles.title}>My Overview</h2>
        <p className={Styles.saving}>
          Saving <span className={Styles.calculation}>$400.00</span>
        </p>
      </header>

      <article className={Styles.infoCells}>
        <div>Income: {income.value}</div>
        <div>Savings: {savings.value}</div>
      </article>
    </section>
  );
};
