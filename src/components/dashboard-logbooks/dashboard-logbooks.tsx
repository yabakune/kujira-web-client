import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as Constants from "@/constants";
import * as Saga from "@/sagas";

import { Overview } from "./overview";
import { LogbookEntries } from "./logbook-entries";

import Styles from "./dashboard-logbooks.module.scss";
 
export const DashboardLogbooks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (Constants.userId) {
      dispatch(Saga.fetchUserLogbooksRequest({ userId: Constants.userId }));
    }
  }, []);

  return (
    <div className={Styles.container}>
      <Overview />
      <LogbookEntries />
    </div>
  );
};
