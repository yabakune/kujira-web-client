import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Redux from "@/redux";
import * as Saga from "@/sagas";

import { Overview } from "./overview";

import Styles from "./dashboard-logbooks.module.scss";

export const DashboardLogbooks = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: Redux.ReduxState) => state.entities
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(Saga.fetchLogbooksRequest({ userId: currentUser.id }));
    }
  }, [currentUser]);

  return (
    <div className={Styles.container}>
      <Overview />
      <section className={Styles.body}>Dashboard Logbooks</section>
    </div>
  );
};
