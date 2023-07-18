import Cookies from "js-cookie";
import { useSignal } from "@preact/signals-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as Saga from "@/sagas";

import { Overview } from "./overview";
import { OverviewSelector } from "./overview-selector";

import Styles from "./dashboard-logbooks.module.scss";

const userId = Cookies.get("userId");

export const DashboardLogbooks = () => {
  console.log("Dashboard logbooks rendered");

  const selectedLogbook = useSignal("");

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
        <OverviewSelector selectedLogbook={selectedLogbook} />
      </section>
    </div>
  );
};
