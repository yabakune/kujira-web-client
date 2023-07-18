import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as Saga from "@/sagas";
import { signalsStore } from "@/signals/signals";

import { Overview } from "./overview";
import { OverviewSelector } from "./overview-selector";

import Styles from "./dashboard-logbooks.module.scss";

const userId = Cookies.get("userId");

export const DashboardLogbooks = () => {
  const { selectedLogbook } = signalsStore;

  const dispatch = useDispatch();

  useEffect(() => {
    if (Number(userId)) {
      dispatch(Saga.fetchUserLogbooksRequest({ userId: Number(userId) }));
    }
  }, []);

  return (
    <div className={Styles.container}>
      <Overview />

      <section className={Styles.body}>
        {!selectedLogbook.value ? (
          <OverviewSelector selectedLogbook={selectedLogbook} />
        ) : (
          <>Dashboard Logbooks</>
        )}
      </section>
    </div>
  );
};
