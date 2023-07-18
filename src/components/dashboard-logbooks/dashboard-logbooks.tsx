import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as Constants from "@/constants";
import * as Saga from "@/sagas";
import { signalsStore } from "@/signals/signals";

import { Overview } from "./overview";
import { OverviewSelector } from "./overview-selector";

import Styles from "./dashboard-logbooks.module.scss";

export const DashboardLogbooks = () => {
  const { selectedLogbookId } = signalsStore;

  const dispatch = useDispatch();

  useEffect(() => {
    if (Constants.userId) {
      dispatch(Saga.fetchUserLogbooksRequest({ userId: Constants.userId }));
    }
  }, []);

  return (
    <div className={Styles.container}>
      <Overview />

      <section className={Styles.body}>
        {!selectedLogbookId.value ? (
          <OverviewSelector />
        ) : (
          <>Dashboard Logbooks</>
        )}
      </section>
    </div>
  );
};
